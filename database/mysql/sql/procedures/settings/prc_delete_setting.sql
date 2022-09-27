DELIMITER $$
CREATE PROCEDURE `prc_delete_setting` (
	p_id_setting		VARCHAR(100)
)  
BEGIN

	DELETE FROM 
		settings
	WHERE
		id_setting = p_id_setting
	;
  
END$$