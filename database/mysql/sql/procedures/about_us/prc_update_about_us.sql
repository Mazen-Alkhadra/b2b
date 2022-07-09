DELIMITER $$
CREATE PROCEDURE `prc_update_about_us` (
	p_id_about_us						BIGINT UNSIGNED,
	p_is_active							BOOLEAN
)  
BEGIN

	UPDATE 
		about_us
	SET
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_about_us = p_id_about_us
	;
  
END$$