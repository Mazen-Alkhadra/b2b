DELIMITER $$
CREATE PROCEDURE `prc_update_contact_info` (
	p_id_contact_info		 BIGINT UNSIGNED,
	p_address						 LONGTEXT,
	p_mobile						 VARCHAR(100),
	p_phone							 VARCHAR(100),
	p_email							 VARCHAR(100),
	p_more_info					 LONGTEXT,
	p_is_active					 BOOLEAN
)  
BEGIN

	UPDATE 
		contact_info
	SET
		address = IFNULL(p_address, address),
		mobile = IFNULL(p_mobile, mobile),
		phone = IFNULL(p_phone, phone),
		email = IFNULL(p_email, email),
		more_info = IFNULL(p_more_info, more_info),
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_contact_info = p_id_contact_info
	;
  
END$$