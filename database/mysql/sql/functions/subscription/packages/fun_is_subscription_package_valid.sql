DELIMITER $$
CREATE FUNCTION `fun_is_subscription_package_valid` (
    p_subscription_package_id  BIGINT UNSIGNED,
    p_allow_false              BOOLEAN
  )
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_res BOOLEAN DEFAULT FALSE;

  SET v_res = EXISTS (
    SELECT 
      id_subscription_package 
    FROM 
      subscription_packages 
    WHERE 
      is_active = TRUE AND
      (expir_at IS NULL OR expir_at > CURRENT_TIMESTAMP()) AND 
      id_subscription_package = p_subscription_package_id
  );

  IF v_res <> TRUE AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, 'InvalidSubscribePackage');
  END IF;

  RETURN v_res;

END$$