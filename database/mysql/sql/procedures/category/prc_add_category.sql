DELIMITER $$
CREATE PROCEDURE `prc_add_category` (
	p_name_str_id						BIGINT UNSIGNED,
	p_description_str_id		BIGINT UNSIGNED,
	p_type									VARCHAR(20),
	p_added_by_user_id			BIGINT UNSIGNED,
	p_is_approved           BOOLEAN,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		categories (
			name_str_id,
			description_str_id,
			type,
			added_by_user_id,
			is_approved
		)
	VALUES (
		p_name_str_id,
		p_description_str_id,
		IFNULL(p_type, DEFAULT(type)),
		p_added_by_user_id,
		IFNULL(p_is_approved, DEFAULT(is_approved))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$