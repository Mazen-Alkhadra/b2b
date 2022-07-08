DELIMITER $$
CREATE PROCEDURE `prc_update_category` (
	p_id_category						BIGINT UNSIGNED,
	p_type									VARCHAR(20),
	p_added_by_user_id			BIGINT UNSIGNED
)  
BEGIN

	UPDATE 
		categories
	SET
		type = IFNULL(p_type, type),
		added_by_user_id = IFNULL(p_added_by_user_id, added_by_user_id)
	WHERE
		id_category = p_id_category
	;
  
END$$