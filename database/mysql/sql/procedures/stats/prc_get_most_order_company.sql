DELIMITER $$
CREATE PROCEDURE `prc_get_most_order_company` ()  
BEGIN

  DECLARE v_company_id BIGINT UNSIGNED DEFAULT NULL;
  DECLARE V_order_total_quantity DOUBLE DEFAULT 0;

	SELECT 
    company_id,
    SUM(quantity)
  INTO 
    v_company_id,
    V_order_total_quantity
  FROM 
    tenders 
    LEFT JOIN users ON creat_by_user_id = id_user
  GROUP BY 
    company_id 
  ORDER BY 
    SUM(quantity) DESC
  LIMIT 1
  ;

  SELECT 
    id_company idCompany,
    fun_get_string(NULL, name_str_id) name,
    company_type_id companyTypeId,
    license_number,
    V_order_total_quantity totalQuantity
  FROM 
    companies 
  WHERE 
    id_company = v_company_id
  LIMIT 1
  ;

END$$