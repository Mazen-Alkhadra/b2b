DELIMITER $$
CREATE PROCEDURE `prc_update_category` (
	p_id_category						BIGINT UNSIGNED,
	p_type									VARCHAR(20),
	p_added_by_user_id			BIGINT UNSIGNED,
	p_is_approved           BOOLEAN
)  
BEGIN

	UPDATE 
		categories
	SET
		type = IFNULL(p_type, type),
		added_by_user_id = IFNULL(p_added_by_user_id, added_by_user_id),
		is_approved = IFNULL(p_is_approved, is_approved)
	WHERE
		id_category = p_id_category
	;
  
END$$