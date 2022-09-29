DELIMITER $$
CREATE PROCEDURE `prc_report_brands_usage` ()  
BEGIN

  SELECT
    id_brand idBrand,
    fun_get_string(NULL, b.name_str_id) name,
    fun_get_string(NULL, b.description_str_id) description,
    b.creat_at creatAt,
    COUNT(id_product) productsCnt
  FROM
    brands b
    LEFT JOIN products ON brand_id = id_brand
  GROUP BY id_brand
  ;

END$$