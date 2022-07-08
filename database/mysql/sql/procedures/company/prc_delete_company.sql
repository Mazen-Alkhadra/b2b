DELIMITER $$
CREATE PROCEDURE `prc_delete_company` (
	p_id_company		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		companies
	WHERE
		id_company = p_id_company
	;
  
END$$