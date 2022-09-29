DELIMITER $$
CREATE FUNCTION `fun_is_offer_new_status_valid` (
  p_offer_id         BIGINT UNSIGNED,
  p_new_status       VARCHAR(50),
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(50) DEFAULT NULL;
  DECLARE v_offer_old_status VARCHAR(50) DEFAULT NULL;

  IF p_new_status IS NULL OR p_offer_id IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT 
    status
  INTO 
    v_offer_old_status
  FROM 
    offers
  WHERE 
    id_offer = p_offer_id
  ;
  
  IF v_offer_old_status IN ('EXECUTED', 'REJECTED') THEN
     SET v_err_code = 'FinalStatus';
  ELSEIF v_offer_old_status = 'ACCEPTED' AND p_new_status <> 'EXECUTED' THEN 
    SET v_err_code = 'InvalidStatus';
  END IF;

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$