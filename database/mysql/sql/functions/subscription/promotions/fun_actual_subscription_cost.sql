DELIMITER $$
CREATE FUNCTION `fun_actual_subscription_cost` (
    p_subscription_package_id   BIGINT UNSIGNED,
    p_promotion_id              BIGINT UNSIGNED
)
RETURNS DOUBLE
BEGIN
  
  DECLARE v_package_price_usd DOUBLE DEFAULT (
    SELECT 
      price_usd
    FROM 
      subscription_packages
    WHERE 
      id_subscription_package = p_subscription_package_id
  );
  
  DECLARE v_promotion_discount_usd DOUBLE DEFAULT (
    SELECT 
      discount_usd
    FROM 
      promotions
    WHERE 
      id_promotion = p_promotion_id
  );
  
  DECLARE v_actual_cost DOUBLE DEFAULT (
    IFNULL(v_package_price_usd, 0) - 
      IFNULL(v_promotion_discount_usd, 0)
  );

  IF v_actual_cost <= 0 THEN
    RETURN 0;
  END IF;


  RETURN v_actual_cost;

END$$