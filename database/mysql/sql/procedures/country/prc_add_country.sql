DELIMITER $$
CREATE PROCEDURE `prc_add_country` (
	p_name_str_id						BIGINT UNSIGNED,
	p_iso_code							VARCHAR(190),
	p_phone_code						VARCHAR(10),
	p_img_url         			VARCHAR(1000),
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		countries (
			name_str_id,
			iso_code,
			phone_code,
			img_id
		)
	VALUES (
		p_name_str_id,
		p_iso_code,
		p_phone_code,
		fun_insert_img(p_img_url)
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$