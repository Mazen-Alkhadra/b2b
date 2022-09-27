DELIMITER $$
CREATE PROCEDURE `prc_update_setting` (
	p_id_setting			VARCHAR(100),
	p_value	          LONGTEXT
)  
BEGIN

	UPDATE 
		settings
	SET
		value = IFNULL(p_value, value)
	WHERE
		id_setting = p_id_setting
	;
  
END$$