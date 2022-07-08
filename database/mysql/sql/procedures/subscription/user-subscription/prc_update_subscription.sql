DELIMITER $$
CREATE PROCEDURE `prc_update_subscription` (
	p_id_subscription						BIGINT UNSIGNED,
	p_user_id										BIGINT UNSIGNED,
	p_subscription_package_id		BIGINT UNSIGNED,
	p_payment_id								BIGINT UNSIGNED,
	p_promotion_id							BIGINT UNSIGNED,
	p_expir_at									DATETIME,
	p_actual_cost_usd						DOUBLE,
	p_is_active									BOOLEAN
)  
BEGIN

	UPDATE 
		subscriptions
	SET
		user_id = IFNULL(p_user_id, user_id),
		subscription_package_id = IFNULL(p_subscription_package_id, subscription_package_id),
		payment_id = IFNULL(p_payment_id, payment_id),
		promotion_id = IFNULL(p_promotion_id, promotion_id),
		expir_at = IFNULL(p_expir_at, expir_at),
		actual_cost_usd = IFNULL(p_actual_cost_usd, actual_cost_usd),
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_subscription = p_id_subscription
	;
  
END$$