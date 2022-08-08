DELIMITER $$
CREATE PROCEDURE `prc_delete_city` (
	p_id_city		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		cities
	WHERE
		id_city = p_id_city
	;
  
END$$