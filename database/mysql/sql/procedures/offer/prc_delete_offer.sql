DELIMITER $$
CREATE PROCEDURE `prc_delete_offer` (
	p_id_offer		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		offers
	WHERE
		id_offer = p_id_offer
	;
  
END$$