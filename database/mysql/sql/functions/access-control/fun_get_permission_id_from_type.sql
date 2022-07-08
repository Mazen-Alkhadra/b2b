DELIMITER $$
CREATE FUNCTION `fun_get_permission_id_from_type` (
  p_permission_type   VARCHAR(20)
)
RETURNS VARCHAR(50)
BEGIN
  
  RETURN p_permission_type;

END$$