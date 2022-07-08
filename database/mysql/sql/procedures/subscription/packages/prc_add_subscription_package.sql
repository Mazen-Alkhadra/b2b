DELIMITER $$
CREATE PROCEDURE `prc_add_subscription_package` (
	p_name_str_id						BIGINT UNSIGNED,
	p_description_str_id		BIGINT UNSIGNED,
	p_price_usd_per_month		DOUBLE,
	p_price_usd_per_year		DOUBLE,
	p_img_url								VARCHAR(500),
	p_expir_at							DATETIME,
	p_validity_seconds			BIGINT UNSIGNED,
	p_is_active							BOOLEAN,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		subscription_packages (
			name_str_id,
			description_str_id,
			price_usd_per_month,
			price_usd_per_year,
			img_id,
			expir_at,
			validity_seconds,
			is_active
		)
	VALUES (
		p_name_str_id,
		p_description_str_id,
		p_price_usd_per_month,
		p_price_usd_per_year,
		fun_insert_img(p_img_url),
		p_expir_at,
		p_validity_seconds,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$