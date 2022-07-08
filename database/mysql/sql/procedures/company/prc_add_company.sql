DELIMITER $$
CREATE PROCEDURE `prc_add_company` (
	p_name_str_id						BIGINT UNSIGNED,
	p_type									VARCHAR(100),
	p_address								LONGTEXT,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		companies (
			name_str_id,
			type,
			address
		)
	VALUES (
		p_name_str_id,
		p_type,
		p_address
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$