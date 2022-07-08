DELIMITER $$
CREATE PROCEDURE `prc_add_product` (
	p_name_str_id						BIGINT UNSIGNED,
	p_description_str_id		BIGINT UNSIGNED,
	p_brand_id							BIGINT UNSIGNED,
	p_added_by_user_id			BIGINT UNSIGNED,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		products (
			name_str_id,
			description_str_id,
			brand_id,
			added_by_user_id
		)
	VALUES (
		p_name_str_id,
		p_description_str_id,
		p_brand_id,
		p_added_by_user_id
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$