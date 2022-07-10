DELIMITER $$
CREATE PROCEDURE `prc_delete_contact_info` (
	p_id_contact_info		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		contact_info
	WHERE
		id_contact_info = p_id_contact_info
	;
  
END$$