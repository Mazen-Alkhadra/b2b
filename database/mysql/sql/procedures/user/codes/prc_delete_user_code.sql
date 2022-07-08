DELIMITER $$
CREATE PROCEDURE `prc_delete_user_code` (
	p_id_code		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		users_codes
	WHERE
		id_code = p_id_code
	;
  
END$$