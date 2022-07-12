DELIMITER $$
CREATE PROCEDURE `prc_get_best_product_price` (
  p_product_id         BIGINT UNSIGNED
)  
BEGIN

  DECLARE v_product_id BIGINT UNSIGNED DEFAULT NULL;
  DECLARE V_best_price DOUBLE DEFAULT 0;

	SELECT 
    product_id,
    MAX(price_usd)
  INTO
    v_product_id,
    V_best_price
  FROM 
    offers 
    INNER JOIN tenders ON tender_id = id_tender
  WHERE 
    offers.status = 'EXECUTED' AND 
    (p_product_id IS NULL OR product_id = p_product_id)
  GROUP BY 
    product_id 
  ORDER BY 
    MAX(price_usd / offers.quantity) DESC
  LIMIT 1
  ;

  SELECT 
    id_product idProduct,
    fun_get_string(NULL, name_str_id) name,
    fun_get_string(NULL, description_str_id) description,
    V_best_price price
  FROM 
    products 
  WHERE 
    id_product = v_product_id
  ;

END$$