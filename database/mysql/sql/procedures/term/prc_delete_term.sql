DELIMITER $$
CREATE PROCEDURE `prc_delete_term` (
	p_id_term		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		terms
	WHERE
		id_term = p_id_term
	;
  
END$$