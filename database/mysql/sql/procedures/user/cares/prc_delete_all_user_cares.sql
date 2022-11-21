DELIMITER $$
CREATE PROCEDURE `prc_delete_all_user_cares` (
	p_user_id		BIGINT UNSIGNED,
	p_id_user_care  BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		users_cares
	WHERE
		id_user_care = p_id_user_care OR
		user_id = p_user_id
	;
  
END$$