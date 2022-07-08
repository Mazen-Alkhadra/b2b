DELIMITER $$
CREATE PROCEDURE `prc_add_user_care` (
	p_user_id							BIGINT UNSIGNED,
	p_category_id					BIGINT UNSIGNED,
	p_brand_id						BIGINT UNSIGNED,
	p_product_id					BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		users_cares (
			user_id,
			category_id,
			brand_id,
			product_id
		)
	VALUES (
		p_user_id,
		p_category_id,
		p_brand_id,
		p_product_id
	)
	;
  
END$$