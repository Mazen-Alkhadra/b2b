DELIMITER $$
CREATE PROCEDURE `prc_add_city` (
	p_name_str_id					BIGINT UNSIGNED,
	p_country_id					INT UNSIGNED,
	p_img_url         		VARCHAR(1000),
	OUT p_out_new_rec_id	BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		cities (
			name_str_id,
			country_id,
			img_id
		)
	VALUES (
		p_name_str_id,
		p_country_id,
		fun_insert_img(p_img_url)
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$