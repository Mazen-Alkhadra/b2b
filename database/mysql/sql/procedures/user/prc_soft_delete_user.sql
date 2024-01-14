DELIMITER $$
CREATE PROCEDURE `prc_soft_delete_user` (
	p_id_user		BIGINT UNSIGNED
)  
BEGIN

	UPDATE 
		users
  SET 
    email = CONCAT(email, '#'),
    mobile = CONCAT(mobile, '#'),
    is_deleted = TRUE
	WHERE
		id_user = p_id_user
	;
  
END$$