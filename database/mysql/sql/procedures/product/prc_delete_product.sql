DELIMITER $$
CREATE PROCEDURE `prc_delete_product` (
	p_id_product		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		products
	WHERE
		id_product = p_id_product
	;
  
END$$