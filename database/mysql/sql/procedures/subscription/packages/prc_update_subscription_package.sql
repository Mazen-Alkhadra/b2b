DELIMITER $$
CREATE PROCEDURE `prc_update_subscription_package` (
	p_id_subscription_package		BIGINT UNSIGNED,
	p_price_usd           			DOUBLE,
	p_img_url										VARCHAR(500),
	p_expir_at									DATETIME,
	p_validity_seconds					BIGINT UNSIGNED,
	p_is_active									BOOLEAN
)  
BEGIN

	UPDATE 
		subscription_packages
	SET
		price_usd = IFNULL(p_price_usd, price_usd),
		img_id = IF(p_img_url IS NULL, img_id, fun_insert_img(p_img_url)),
		expir_at = IFNULL(p_expir_at, expir_at),
		validity_seconds = IFNULL(p_validity_seconds, validity_seconds),
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_subscription_package = p_id_subscription_package
	;
  
END$$