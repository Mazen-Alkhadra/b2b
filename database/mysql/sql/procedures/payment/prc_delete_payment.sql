DELIMITER $$
CREATE PROCEDURE `prc_delete_payment` (
	p_id_payment		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		payments
	WHERE
		id_payment = p_id_payment
	;
  
END$$