DELIMITER $$
CREATE FUNCTION `fun_is_tender_b2b` (
    p_tender_id     BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN

  RETURN fun_is_tender_complete_qntity(p_tender_id, TRUE);
  
END$$