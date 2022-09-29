DELIMITER $$
CREATE PROCEDURE `prc_report_categories_usage` ()  
BEGIN

  SELECT
    id_category idCategory,
    fun_get_string(NULL, c.name_str_id) name,
    fun_get_string(NULL, c.description_str_id) description,
    c.creat_at creatAt,
    COUNT(id_brand) brandsCnt
  FROM
    categories c
    LEFT JOIN brands ON category_id = id_category
  GROUP BY id_category
  ;

END$$