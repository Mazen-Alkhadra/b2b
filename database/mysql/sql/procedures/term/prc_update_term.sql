DELIMITER $$
CREATE PROCEDURE `prc_update_term` (
	p_id_term		BIGINT UNSIGNED,
	p_is_active		BOOLEAN
)  
BEGIN

	UPDATE 
		terms
	SET
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_term = p_id_term
	;
  
END$$