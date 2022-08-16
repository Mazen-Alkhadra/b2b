DELIMITER $$
CREATE PROCEDURE `prc_get_most_buy_company` ()  
BEGIN

  DECLARE v_company_id BIGINT UNSIGNED DEFAULT NULL;
  DECLARE V_buy_total_quantity DOUBLE DEFAULT 0;

	SELECT 
    company_id,
    SUM(quantity)
  INTO 
    v_company_id,
    V_buy_total_quantity
  FROM 
    offers 
    LEFT JOIN users ON creat_by_user_id = id_user
  WHERE 
    status = 'EXECUTED'
  GROUP BY 
    company_id 
  ORDER BY 
    SUM(quantity) DESC
  ;

  SELECT 
    id_company idCompany,
    fun_get_string(NULL, name_str_id) name,
    company_type_id companyTypeId,
    license_number,
    V_buy_total_quantity totalQuantity
  FROM 
    companies 
  WHERE 
    id_company = v_company_id
  LIMIT 1
  ;

END$$