DELIMITER $$
CREATE FUNCTION `fun_actual_subscription_cost` (
    p_subscription_package_id   BIGINT UNSIGNED,
    p_promotion_id              BIGINT UNSIGNED
)
RETURNS DOUBLE
BEGIN
  
  DECLARE v_promotion_discount_usd DOUBLE DEFAULT NULL; 
  DECLARE v_promotion_discount_ration DOUBLE DEFAULT NULL;
  DECLARE v_actual_cost DOUBLE DEFAULT NULL;
  DECLARE v_package_price_usd DOUBLE DEFAULT (
    SELECT 
      price_usd
    FROM 
      subscription_packages
    WHERE 
      id_subscription_package = p_subscription_package_id
  );
  
  SELECT 
    discount_usd,
    discount_ratio
  INTO
    v_promotion_discount_usd,
    v_promotion_discount_ration
  FROM 
    promotions
  WHERE 
    id_promotion = p_promotion_id
  ;
     
  SET v_actual_cost = IFNULL(v_package_price_usd, 0) - 
    COALESCE(
      v_promotion_discount_usd,
      v_promotion_discount_ration * v_package_price_usd,
      0
    )
  ;

  IF v_actual_cost <= 0 THEN
    RETURN 0;
  END IF;


  RETURN v_actual_cost;

END$$