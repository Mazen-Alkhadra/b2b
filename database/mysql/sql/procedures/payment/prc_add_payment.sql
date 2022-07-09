DELIMITER $$
CREATE PROCEDURE `prc_add_payment` (
	p_user_id								BIGINT UNSIGNED,
	p_type									VARCHAR(20),
	p_amount_usd						DOUBLE,
	p_comment								VARCHAR(500),
	p_status								VARCHAR(20),
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		payments (
			user_id,
			type,
			amount_usd,
			comment,
			status
		)
	VALUES (
		p_user_id,
		IFNULL(p_type, DEFAULT(type)),
		p_amount_usd,
		p_comment,
		IFNULL(p_status, DEFAULT(status))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$