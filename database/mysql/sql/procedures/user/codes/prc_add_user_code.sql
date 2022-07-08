DELIMITER $$
CREATE PROCEDURE `prc_add_user_code` (
	p_user_id							BIGINT UNSIGNED,
	p_code								VARCHAR(190),
	p_type								VARCHAR(20),
	p_is_active						BOOLEAN,
	p_expiry_date_time		DATETIME,
	OUT p_out_new_rec_id	BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		users_codes (
			user_id,
			code,
			type,
			is_active,
			expiry_date_time
		)
	VALUES (
		p_user_id,
		p_code,
		p_type,
		IFNULL(p_is_active, DEFAULT(is_active)),
		p_expiry_date_time
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$