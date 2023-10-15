DELIMITER $$
CREATE FUNCTION `fun_is_user_trusted` (
  p_user_id       BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN

  RETURN EXISTS (
    SELECT 
      TRUE
    FROM 
      users 
      INNER JOIN companies ON company_id = id_company
    WHERE 
      id_user = p_user_id AND 
      is_trusted = TRUE
  )
  ;
  
END$$