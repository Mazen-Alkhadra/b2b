DELIMITER $$
CREATE PROCEDURE `prc_add_company` (
	p_name_str_id						BIGINT UNSIGNED,
	p_type									VARCHAR(100),
	p_address								LONGTEXT,
	p_license_number        LONGTEXT,
  p_establish_at          DATETIME,
	p_license_img_url       VARCHAR(500),
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		companies (
			name_str_id,
			type,
			address,
			license_number,
			establish_at,
			license_img_id
		)
	VALUES (
		p_name_str_id,
		p_type,
		p_address,
		p_license_number,
		p_establish_at,
		fun_insert_img(p_license_img_url)
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$