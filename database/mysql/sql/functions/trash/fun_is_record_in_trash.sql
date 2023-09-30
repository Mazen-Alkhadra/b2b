DELIMITER $$
CREATE FUNCTION `fun_is_record_in_trash` (
    p_record_id     BIGINT UNSIGNED,
    p_user_id       BIGINT UNSIGNED,
    p_type          VARCHAR(50)
)
RETURNS BOOLEAN
BEGIN

  RETURN EXISTS (
    SELECT 
      TRUE
    FROM 
      trash
    WHERE 
      record_id = p_record_id AND 
      user_id = p_user_id AND 
      type = p_type
  )
  ;
  
END$$