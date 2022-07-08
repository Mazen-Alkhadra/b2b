DELIMITER $$
CREATE PROCEDURE `prc_update_promotion` (
	p_id_promotion			BIGINT UNSIGNED,
	p_code							VARCHAR(190),
	p_type							VARCHAR(20),
	p_start_at					DATETIME,
	p_end_at						DATETIME,
	p_discount_usd			DOUBLE,
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
		discount_usd = IFNULL(p_discount_usd, discount_usd),
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_promotion = p_id_promotion
	;
  
END$$