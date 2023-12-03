DELIMITER $$
CREATE FUNCTION `fun_can_update_offer` (
  p_user_id         BIGINT UNSIGNED,
  p_offer_id        BIGINT UNSIGNED,
  p_status          VARCHAR(20),
  p_allow_false     BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(50) DEFAULT NULL;
  
  IF p_offer_id IS NULL THEN
    RETURN FALSE;
  END IF;

  IF p_user_id IS NULL THEN 
    SELECT 
      t.creat_by_user_id
    INTO 
      p_user_id
    FROM 
      offers o
      INNER JOIN tenders t ON tender_id = id_tender
    WHERE 
      id_offer = p_offer_id
    ;
  END IF;

  IF p_status IS NOT NULL AND 
    !fun_can_user_change_offer_status(p_user_id, p_offer_id, p_status, p_allow_false)
  THEN
    RETURN FALSE;
	END IF; 

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$