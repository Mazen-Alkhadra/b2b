DELIMITER $$
CREATE PROCEDURE `prc_add_contact_info` (
	p_address								LONGTEXT,
	p_mobile								VARCHAR(100),
	p_phone									VARCHAR(100),
	p_email									VARCHAR(100),
	p_more_info							LONGTEXT,
	p_is_active							BOOLEAN,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		contact_info (
			address,
			mobile,
			phone,
			email,
			more_info,
			is_active
		)
	VALUES (
		p_address,
		p_mobile,
		p_phone,
		p_email,
		p_more_info,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$