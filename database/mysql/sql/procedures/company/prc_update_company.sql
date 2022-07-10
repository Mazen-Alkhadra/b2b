DELIMITER $$
CREATE PROCEDURE `prc_update_company` (
	p_id_company			BIGINT UNSIGNED,
	p_type						VARCHAR(100),
	p_address					LONGTEXT,
	p_license_number  LONGTEXT,
  p_establish_at    DATETIME,
	p_license_img_url VARCHAR(500)
)  
BEGIN

	UPDATE 
		companies
	SET
		type = IFNULL(p_type, type),
		address = IFNULL(p_address, address),
		license_number = IFNULL(p_license_number, license_number),
		establish_at = IFNULL(p_establish_at, establish_at),
		license_img_id = IF (
			p_license_img_url IS NULL, 
			license_img_id, 
			fun_insert_img(license_img_url)
		)
	WHERE
		id_company = p_id_company
	;
  
END$$