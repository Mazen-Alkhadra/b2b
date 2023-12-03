DELIMITER $$
CREATE PROCEDURE `prc_delete_user` (
	p_id_user		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		brands 
	WHERE 
		added_by_user_id = p_id_user;

	DELETE FROM 
		users
	WHERE
		id_user = p_id_user
	;
  
END$$