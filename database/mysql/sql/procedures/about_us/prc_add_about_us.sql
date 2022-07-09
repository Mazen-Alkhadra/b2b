DELIMITER $$
CREATE PROCEDURE `prc_add_about_us` (
	p_company_info_str_id		BIGINT UNSIGNED,
	p_who_are_we_str_id			BIGINT UNSIGNED,
	p_view_str_id						BIGINT UNSIGNED,
	p_target_str_id					BIGINT UNSIGNED,
	p_other_info_str_id			BIGINT UNSIGNED,
	p_is_active							BOOLEAN,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		about_us (
			company_info_str_id,
			who_are_we_str_id,
			view_str_id,
			target_str_id,
			other_info_str_id,
			is_active
		)
	VALUES (
		p_company_info_str_id,
		p_who_are_we_str_id,
		p_view_str_id,
		p_target_str_id,
		p_other_info_str_id,
		p_is_active
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$