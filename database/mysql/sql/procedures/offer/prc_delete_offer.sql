DELIMITER $$
CREATE PROCEDURE `prc_delete_offer` (
	p_id_offer		BIGINT UNSIGNED
)  
BEGIN

	SET @_ = fun_can_update_offer(NULL, p_id_offer, NULL, FALSE);

	DELETE FROM 
		offers
	WHERE
		id_offer = p_id_offer
	;
  
END$$