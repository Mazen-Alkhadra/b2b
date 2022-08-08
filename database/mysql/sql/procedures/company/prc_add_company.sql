DELIMITER $$
CREATE PROCEDURE `prc_add_company` (
	p_name_str_id						BIGINT UNSIGNED,
	p_type									VARCHAR(100),
	p_city_id               BIGINT UNSIGNED,
  p_area                  LONGTEXT,
  p_street                LONGTEXT,
  p_building_number       LONGTEXT,
  p_address_longitude     LONGTEXT,
  p_address_latitude      LONGTEXT,              
  p_more_address_info     LONGTEXT,
	p_license_number        LONGTEXT,
	p_license_expir_at      DATETIME, 
  p_establish_at          DATETIME,
	p_license_img_url       VARCHAR(500),
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		companies (
			name_str_id,
			type,
			city_id,
			area,
			street,
			building_number,
			address_longitude,
			address_latitude,
			more_address_info,
			license_number,
			license_expir_at,
			establish_at,
			license_img_id
		)
	VALUES (
		p_name_str_id,
		p_type,
		p_city_id,
		p_area,
		p_street,
		p_building_number,
		p_address_longitude,
		p_address_latitude,
		p_more_address_info,
		p_license_number,
		p_license_expir_at,
		p_establish_at,
		fun_insert_img(p_license_img_url)
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$