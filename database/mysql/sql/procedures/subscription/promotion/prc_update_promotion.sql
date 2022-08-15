DELIMITER $$
CREATE PROCEDURE `prc_update_promotion` (
	p_id_promotion			BIGINT UNSIGNED,
	p_code							VARCHAR(190),
	p_start_at					DATETIME,
	p_end_at						DATETIME,
	p_use_count_limit   BIGINT UNSIGNED,
	p_discount_usd			DOUBLE,
	p_discount_ratio    DOUBLE,
	p_is_active					BOOLEAN
)  
BEGIN

	UPDATE 
		promotions
	SET
		code = IFNULL(p_code, code),
		type = IFNULL(p_type, type),
		start_at = IFNULL(p_start_at, start_at),
		end_at = IFNULL(p_end_at, end_at),
		use_count_limit = IF (
			p_use_count_limit = 0,
			NULL,
			IFNULL(p_use_count_limit, use_count_limit)
		),
		discount_usd = IFNULL(p_discount_usd, discount_usd),
		discount_ratio = IFNULL(p_discount_ratio, discount_ratio),
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_promotion = p_id_promotion
	;
  
END$$