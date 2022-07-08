DELIMITER $$
CREATE PROCEDURE `prc_delete_user` (
	p_id_user		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		users
	WHERE
		id_user = p_id_user
	;
  
END$$