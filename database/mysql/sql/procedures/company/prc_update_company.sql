DELIMITER $$
CREATE PROCEDURE `prc_update_company` (
	p_id_company		BIGINT UNSIGNED,
	p_type					VARCHAR(100),
	p_address				LONGTEXT
)  
BEGIN

	UPDATE 
		companies
	SET
		type = IFNULL(p_type, type),
		address = IFNULL(p_address, address)
	WHERE
		id_company = p_id_company
	;
  
END$$