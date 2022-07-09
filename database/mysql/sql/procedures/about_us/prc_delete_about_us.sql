DELIMITER $$
CREATE PROCEDURE `prc_delete_about_us` (
	p_id_about_us		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		about_us
	WHERE
		id_about_us = p_id_about_us
	;
  
END$$