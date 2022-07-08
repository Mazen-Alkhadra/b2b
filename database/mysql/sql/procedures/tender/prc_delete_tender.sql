DELIMITER $$
CREATE PROCEDURE `prc_delete_tender` (
	p_id_tender		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		tenders
	WHERE
		id_tender = p_id_tender
	;
  
END$$