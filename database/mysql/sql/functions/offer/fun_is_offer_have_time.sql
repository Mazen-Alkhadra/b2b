DELIMITER $$
CREATE FUNCTION `fun_is_offer_have_time` (
  p_offer_id         BIGINT UNSIGNED,
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(50) DEFAULT NULL;
   DECLARE v_offer_create_at  DATETIME DEFAULT NULL;

  IF p_offer_id IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT 
    creat_at
  INTO 
    v_offer_create_at
  FROM 
    offers
  WHERE 
    id_offer = p_offer_id
  ;
  
  IF DATE_ADD(
		v_offer_create_at, 
		INTERVAL fun_get_setting_val('MAX_ACCEPT_OFFER_TIME_SEC') SECOND
	) < CURRENT_TIMESTAMP() THEN 
    SET v_err_code = 'MaxOfferTimeExceed';
  END IF;

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$