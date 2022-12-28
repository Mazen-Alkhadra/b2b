DELIMITER $$
CREATE PROCEDURE `prc_delete_user` (
	p_id_user		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		users_codes
	WHERE
		user_id = p_id_user
	;

	DELETE FROM 
		users
	WHERE
		id_user = p_id_user
	;
  
END$$