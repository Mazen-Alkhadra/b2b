DELIMITER $$
CREATE PROCEDURE `prc_delete_promotion` (
	p_id_promotion		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		promotions
	WHERE
		id_promotion = p_id_promotion
	;
  
END$$