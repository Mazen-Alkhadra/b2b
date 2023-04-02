DELIMITER $$
CREATE FUNCTION `fun_get_default_subscribe_package` ()
RETURNS BIGINT UNSIGNED
BEGIN
  
  RETURN (
    SELECT 
      id_subscription_package 
    FROM 
      subscription_packages
    WHERE 
      fun_is_subscription_package_valid(id_subscription_package, TRUE) AND 
      is_default = TRUE 
    LIMIT 1
  );

END$$