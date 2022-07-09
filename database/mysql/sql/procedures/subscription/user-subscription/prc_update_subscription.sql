DELIMITER $$
CREATE PROCEDURE `prc_update_subscription` (
	p_id_subscription						BIGINT UNSIGNED,
	p_user_id										BIGINT UNSIGNED,
	p_subscription_package_id		BIGINT UNSIGNED,
	p_payment_id								BIGINT UNSIGNED,
	p_promotion_id							BIGINT UNSIGNED,
	p_promotion_code						VARCHAR(190),
	p_expir_at									DATETIME,
	p_actual_cost_usd						DOUBLE,
	p_is_active									BOOLEAN
)  
BEGIN

	DECLARE v_old_subscription_package_id BIGINT UNSIGNED DEFAULT NULL;
	DECLARE v_old_promotion_id BIGINT UNSIGNED DEFAULT NULL;
	DECLARE v_old_user_id BIGINT UNSIGNED DEFAULT NULL;

	SELECT 
		subscription_package_id,
		promotion_id,
		user_id
	INTO 
		v_old_subscription_package_id,
		v_old_promotion_id,
		v_old_user_id
	FROM 
		subscriptions
	WHERE 
		id_subscription = p_id_subscription
	;

	IF p_subscription_package_id IS NOT NULL THEN 
		SET @_ = 
			fun_is_subscription_package_valid(p_subscription_package_id, FALSE);
		SET p_actual_cost_usd = fun_actual_subscription_cost (
			p_subscription_package_id,
			v_old_promotion_id
		);
	END IF;

	IF p_promotion_id IS NOT NULL OR p_promotion_code IS NOT NULL THEN 
		SET p_promotion_id = 
			fun_consume_promotion(p_promotion_id, p_promotion_code);
		SET p_actual_cost_usd = 
			fun_actual_subscription_cost (
					IFNULL(p_subscription_package_id, v_old_subscription_package_id),
					p_promotion_id
			);
	END IF;

	IF p_actual_cost_usd IS NOT NULL THEN 
		CALL prc_add_payment (
			IFNULL(p_user_id, v_old_user_id),
			NULL, 
			p_actual_cost_usd, 
			NULL, 
			NULL, 
			p_payment_id
		);
	END IF;

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