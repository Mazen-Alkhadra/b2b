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
  DECLARE v_offer_create_at  DATETIME DEFAULT NULL;
  DECLARE v_offer_old_status VARCHAR(50) DEFAULT NULL;

  IF p_new_status IS NULL OR p_offer_id IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT 
    creat_at,
    status
  INTO 
    v_offer_create_at, 
    v_offer_old_status
  FROM 
    offers
  WHERE 
    id_offer = p_offer_id
  ;
  
  IF fun_is_user_admin(p_user_id) THEN 
    RETURN TRUE;
  ELSEIF DATE_ADD(
		v_offer_create_at, 
		INTERVAL fun_get_setting_val('MAX_ACCEPT_OFFER_TIME_SEC') SECOND
	) < CURRENT_TIMESTAMP() THEN 
    SET v_err_code = 'MaxOfferTimeExceed';
    CALL prc_update_offer(p_offer_id, NULL, NULL, NULL,
      NULL, NULL, NULL, NULL, 'REJECTED', NULL, NULL);
  END IF;

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$