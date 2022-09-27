DELIMITER $$
CREATE FUNCTION `fun_get_setting_val` (
    p_setting_id    VARCHAR(100)
)
RETURNS LONGTEXT
BEGIN
  
  RETURN (
    SELECT 
      value 
    FROM 
      settings 
    WHERE 
      id_setting = p_setting_id
  );
  
END$$