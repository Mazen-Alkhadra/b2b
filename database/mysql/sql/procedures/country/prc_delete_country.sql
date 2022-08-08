DELIMITER $$
CREATE PROCEDURE `prc_delete_country` (
	p_id_country		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		countries
	WHERE
		id_country = p_id_country
	;
  
END$$