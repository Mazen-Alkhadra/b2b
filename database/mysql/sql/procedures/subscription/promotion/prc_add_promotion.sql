DELIMITER $$
CREATE PROCEDURE `prc_add_promotion` (
	p_code									VARCHAR(190),
	p_description_str_id		BIGINT UNSIGNED,
	p_start_at						  DATETIME,
	p_end_at								DATETIME,
	p_use_count_limit       BIGINT UNSIGNED,
	p_discount_usd					DOUBLE,
	p_discount_ratio        DOUBLE,
	p_is_active							BOOLEAN,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		promotions (
			code,
			description_str_id,
			start_at,
			end_at,
			use_count_limit,
			discount_usd,
			discount_ratio,
			is_active
		)
	VALUES (
		p_code,
		p_description_str_id,
		p_start_at,
		p_end_at,
		p_use_count_limit,
		p_discount_usd,
		p_discount_ratio,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$