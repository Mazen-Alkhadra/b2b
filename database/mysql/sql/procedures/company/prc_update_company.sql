DELIMITER $$
CREATE PROCEDURE `prc_update_company` (
	p_id_company		      	BIGINT UNSIGNED,
	p_company_type_id				BIGINT UNSIGNED,
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
	p_is_trusted            BOOLEAN
)  
BEGIN

	UPDATE 
		companies
	SET
		company_type_id = IFNULL(p_company_type_id, company_type_id),
		city_id = IFNULL(p_city_id, city_id),
		area = IFNULL(p_area, area),
		street = IFNULL(p_street, street),
		building_number = IFNULL(p_building_number, building_number),
		address_longitude = IFNULL(p_address_longitude, address_longitude),
		address_latitude = IFNULL(p_address_latitude, address_latitude),
		more_address_info = IFNULL(p_more_address_info, more_address_info),
		license_number = IFNULL(p_license_number, license_number),
		license_expir_at = IFNULL(p_license_expir_at, license_expir_at),
		establish_at = IFNULL(p_establish_at, establish_at),
		license_img_id = IF (
			p_license_img_url IS NULL, 
			license_img_id, 
			fun_insert_img(p_license_img_url)
		),
		is_trusted = IFNULL(p_is_trusted, is_trusted)
	WHERE
		id_company = p_id_company
	;
  
END$$