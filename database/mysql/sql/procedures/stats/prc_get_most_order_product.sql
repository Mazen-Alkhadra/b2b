DELIMITER $$
CREATE PROCEDURE `prc_get_most_order_product` ()  
BEGIN

  DECLARE v_product_id BIGINT UNSIGNED DEFAULT NULL;
  DECLARE V_order_total_quantity DOUBLE DEFAULT 0;

	SELECT 
    product_id,
    SUM(quantity)
  INTO 
    v_product_id,
    V_order_total_quantity
  FROM 
    tenders 
    LEFT JOIN users ON creat_by_user_id = id_user
  GROUP BY 
    company_id, product_id
  ORDER BY 
    SUM(quantity) DESC
  LIMIT 1
  ;

  SELECT 
    id_product idProduct,
    fun_get_string(NULL, name_str_id) name,
    fun_get_string(NULL, description_str_id) description,
    V_order_total_quantity totalQuantity
  FROM 
    products 
  WHERE 
    id_product = v_product_id
  ;

END$$