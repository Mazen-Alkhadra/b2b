DELIMITER $$
CREATE FUNCTION `fun_can_user_create_tender` (
  p_user_id          BIGINT UNSIGNED,
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(50) DEFAULT NULL;
  
  IF fun_is_user_admin(p_user_id) THEN 
    RETURN TRUE;
  ELSEIF !fun_is_verified(NULL, p_user_id, p_allow_false) THEN
    RETURN FALSE; 
  ELSEIF fun_get_user_subscribe_feature_val(NULL, p_user_id, 'TENDERS_PER_MONTH') <=
    fun_get_user_tender_count(p_user_id, 30) THEN 
      SET v_err_code = 'TENDERS_CNT_MONTHLY_EXCEED';
  ELSEIF fun_get_user_subscribe_feature_val(NULL, p_user_id, 'TENDERS_PER_DAY') <=
     fun_get_user_tender_count(p_user_id, 1) THEN
      SET v_err_code = 'TENDERS_CNT_DAYLY_EXCEED';
  END IF;

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$