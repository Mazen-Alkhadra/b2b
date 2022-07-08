DELIMITER $$
CREATE PROCEDURE `prc_update_brand` (
	p_id_brand							BIGINT UNSIGNED,
	p_category_id						BIGINT UNSIGNED,
	p_added_by_user_id			BIGINT UNSIGNED
)  
BEGIN

	UPDATE 
		brands
	SET
		category_id = IFNULL(p_category_id, category_id),
		added_by_user_id = IFNULL(p_added_by_user_id, added_by_user_id)
	WHERE
		id_brand = p_id_brand
	;
  
END$$