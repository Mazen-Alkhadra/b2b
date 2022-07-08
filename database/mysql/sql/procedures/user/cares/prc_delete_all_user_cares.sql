DELIMITER $$
CREATE PROCEDURE `prc_delete_all_user_cares` (
	p_user_id		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		users_cares
	WHERE
		user_id = p_user_id
	;
  
END$$