DELIMITER $$
CREATE FUNCTION `fun_can_user_change_offer_status` (
  p_user_id          BIGINT UNSIGNED,
  p_offer_id         BIGINT UNSIGNED,
  p_new_status       VARCHAR(50),
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(50) DEFAULT NULL;
  SET p_allow_false = IFNULL(p_allow_false, FALSE);

  IF p_user_id IS NOT NULL AND NOT EXISTS (
    SELECT 
      id_offer 
    FROM 
      offers o
      INNER JOIN tenders t ON o.tender_id = t.id_tender 
    WHERE 
      id_offer = p_offer_id AND
      t.creat_by_user_id = p_user_id
  ) THEN
    SET v_err_code = 'AccessDenied';

  ELSEIF p_new_status IS NULL OR 
    p_offer_id IS NULL OR 
    !fun_is_offer_new_status_valid(p_offer_id, p_new_status, p_allow_false) OR 
    !fun_is_offer_have_time(p_offer_id, p_allow_false)
  THEN
    SET v_err_code = 'InvalidStatus';

  ELSEIF p_new_status = 'ACCEPTED' AND 
    fun_get_user_subscribe_feature_val(NULL, p_user_id, 'ACCEPT_OFFERS_COUNT', 'SUM') <=
    fun_get_offers_cnt_user_accept(p_user_id, NULL, TRUE) 
  THEN 
    SET v_err_code = 'ACCEPT_OFFERS_CNT_EXCEED';

  END IF;

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
      CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$