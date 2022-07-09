DELIMITER $$
CREATE FUNCTION `fun_get_user_subscription_expir` (
    p_subscription_package_id BIGINT UNSIGNED
)
RETURNS DATETIME
BEGIN
  
  DECLARE v_package_validity_seconds BIGINT UNSIGNED DEFAULT (
    SELECT 
      validity_seconds
    FROM 
      subscription_packages
    WHERE 
      id_subscription_package = p_subscription_package_id
  );
  
  IF v_package_validity_seconds IS NULL THEN
    RETURN NULL;
  END IF;


  RETURN DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL v_package_validity_seconds SECOND);

END$$