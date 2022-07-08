DELIMITER $$
CREATE PROCEDURE `prc_delete_category` (
	p_id_category		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		categories
	WHERE
		id_category = p_id_category
	;
  
END$$