DELIMITER $$
CREATE FUNCTION `fun_is_verified` (
  p_login_name       VARCHAR(200)
)
RETURNS BOOLEAN
BEGIN

  RETURN EXISTS (
    SELECT 
      TRUE
    FROM 
      verified
    WHERE 
      login_name = p_login_name
  )
  ;
  
END$$