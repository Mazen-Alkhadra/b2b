DELIMITER $$
CREATE PROCEDURE `prc_update_country` (
	p_id_country	  	BIGINT UNSIGNED,
	p_iso_code		    VARCHAR(190),
	p_phone_code		  VARCHAR(10),
	p_img_url         VARCHAR(1000)
)  
BEGIN

	UPDATE 
		countries
	SET
		iso_code = IFNULL(p_iso_code, iso_code),
		phone_code = IFNULL(p_phone_code, phone_code),
		img_id = IF(p_img_url IS NULL, img_id, fun_insert_img(p_img_url))
	WHERE
		id_country = p_id_country
	;
  
END$$