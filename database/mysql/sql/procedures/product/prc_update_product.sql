DELIMITER $$
CREATE PROCEDURE `prc_update_product` (
	p_id_product		BIGINT UNSIGNED,
	p_brand_id		BIGINT UNSIGNED,
	p_added_by_user_id		BIGINT UNSIGNED
)  
BEGIN

	UPDATE 
		products
	SET
		brand_id = IFNULL(p_brand_id, brand_id),
		added_by_user_id = IFNULL(p_added_by_user_id, added_by_user_id)
	WHERE
		id_product = p_id_product
	;
  
END$$