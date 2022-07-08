DELIMITER $$
CREATE PROCEDURE `prc_add_promotion` (
	p_code									VARCHAR(190),
	p_description_str_id		BIGINT UNSIGNED,
	p_type									VARCHAR(20),
	p_start_at						  DATETIME,
	p_end_at								DATETIME,
	p_discount_usd					DOUBLE,
	p_is_active							BOOLEAN,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		promotions (
			code,
			description_str_id,
			type,
			start_at,
			end_at,
			discount_usd,
			is_active
		)
	VALUES (
		p_code,
		p_description_str_id,
		p_type,
		p_start_at,
		p_end_at,
		p_discount_usd,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$