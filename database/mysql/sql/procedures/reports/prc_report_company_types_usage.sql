DELIMITER $$
CREATE PROCEDURE `prc_report_company_types_usage` ()  
BEGIN

  SELECT
    id_company_type idCompanyType,
    fun_get_string(NULL, ct.name_str_id) name,
    fun_get_string(NULL, ct.description_str_id) description,
    COUNT(id_company) companiesCnt
  FROM
    company_types ct
    LEFT JOIN companies ON company_type_id = id_company_type
  GROUP BY id_company_type
  ;

END$$