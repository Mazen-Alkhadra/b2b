DELIMITER $$
CREATE PROCEDURE `prc_update_brand` (
	p_id_brand							BIGINT UNSIGNED,
	p_category_id						BIGINT UNSIGNED,
	p_added_by_user_id			BIGINT UNSIGNED,
	p_is_approved           BOOLEAN
)  
BEGIN

	UPDATE 
		brands
	SET
		category_id = IFNULL(p_category_id, category_id),
		added_by_user_id = IFNULL(p_added_by_user_id, added_by_user_id),
		is_approved = IFNULL(p_is_approved, is_approved)
	WHERE
		id_brand = p_id_brand
	;
  
END$$