DELIMITER $$
CREATE PROCEDURE `prc_delete_brand` (
	p_id_brand		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		brands
	WHERE
		id_brand = p_id_brand
	;
  
END$$