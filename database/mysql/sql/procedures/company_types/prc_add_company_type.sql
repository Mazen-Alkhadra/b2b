DELIMITER $$
CREATE PROCEDURE `prc_add_company_type` (
	p_name_str_id						BIGINT UNSIGNED,
	p_description_str_id		BIGINT UNSIGNED,
	p_out_new_rec_id        BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		company_types (
			name_str_id,
			description_str_id
		)
	VALUES (
		p_name_str_id,
		p_description_str_id
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$