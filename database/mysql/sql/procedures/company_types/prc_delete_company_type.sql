DELIMITER $$
CREATE PROCEDURE `prc_delete_company_type` (
	p_id_company_type	   	BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		company_types
	WHERE
		id_company_type = p_id_company_type
	;
  
END$$