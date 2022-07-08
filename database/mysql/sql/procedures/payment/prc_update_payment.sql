DELIMITER $$
CREATE PROCEDURE `prc_update_payment` (
	p_id_payment		BIGINT UNSIGNED,
	p_user_id				BIGINT UNSIGNED,
	p_type					VARCHAR(20),
	p_amount_usd		DOUBLE,
	p_comment				VARCHAR(500),
	p_status				VARCHAR(20)
)  
BEGIN

	UPDATE 
		payments
	SET
		user_id = IFNULL(p_user_id, user_id),
		type = IFNULL(p_type, type),
		amount_usd = IFNULL(p_amount_usd, amount_usd),
		comment = IFNULL(p_comment, comment),
		status = IFNULL(p_status, status)
	WHERE
		id_payment = p_id_payment
	;
  
END$$