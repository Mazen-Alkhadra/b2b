DELIMITER $$
CREATE PROCEDURE `prc_update_city` (
	p_id_city		    BIGINT UNSIGNED,
	p_country_id		INT UNSIGNED,
	p_img_url       VARCHAR(1000)
)  
BEGIN

	UPDATE 
		cities
	SET
		country_id = IFNULL(p_country_id, country_id),
		img_id = IF(p_img_url IS NULL, img_id, fun_insert_img(p_img_url))
	WHERE
		id_city = p_id_city
	;
  
END$$