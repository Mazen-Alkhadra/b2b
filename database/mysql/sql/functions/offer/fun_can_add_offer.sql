DELIMITER $$
CREATE FUNCTION `fun_can_add_offer` (
  p_user_id         BIGINT UNSIGNED,
  p_tender_id       BIGINT UNSIGNED,
  p_allow_false     BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(50) DEFAULT NULL;
  
  IF p_tender_id IS NULL THEN
    RETURN FALSE;
  END IF;

  IF !fun_is_verified(NULL, p_user_id, p_allow_false) THEN
    RETURN FALSE;
  END IF;

  IF EXISTS (
    SELECT 
      TRUE 
    FROM 
      tenders 
    WHERE 
      id_tender = p_tender_id AND
      creat_by_user_id = p_user_id
  ) THEN 
    SET v_err_code = 'OfferOwnTender';
  END IF;
  
  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$