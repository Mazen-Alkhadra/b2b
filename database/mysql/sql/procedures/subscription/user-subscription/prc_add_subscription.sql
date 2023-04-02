DELIMITER $$
CREATE PROCEDURE `prc_add_subscription` (
	p_user_id										BIGINT UNSIGNED,
	p_subscription_package_id		BIGINT UNSIGNED,
	p_payment_id								BIGINT UNSIGNED,
	p_promotion_id							BIGINT UNSIGNED,
	p_promotion_code            VARCHAR(190),
	p_expir_at									DATETIME,
	p_actual_cost_usd						DOUBLE,
	p_is_active									BOOLEAN,
	OUT p_out_new_rec_id				BIGINT UNSIGNED
)  
BEGIN
	
	SET @_ = fun_is_subscription_package_valid(p_subscription_package_id, FALSE);

	IF p_promotion_id IS NOT NULL OR p_promotion_code IS NOT NULL THEN 
		SET @_ = fun_is_promotion_valid(id_promotion, p_promotion_code, FALSE);
		SET p_promotion_id = fun_consume_promotion(p_promotion_id, p_promotion_code);	
	END IF;

	SET p_actual_cost_usd = 
		fun_actual_subscription_cost(p_subscription_package_id, p_promotion_id);

	IF p_payment_id IS NULL THEN 
		CALL prc_add_payment (
			p_user_id, NULL, p_actual_cost_usd, NULL, NULL, p_payment_id
		);
	END IF;

	INSERT INTO 
		subscriptions (
			user_id,
			subscription_package_id,
			payment_id,
			promotion_id,
			expir_at,
			actual_cost_usd,
			is_active
		)
	VALUES (
		p_user_id,
		p_subscription_package_id,
		p_payment_id,
		p_promotion_id,
		IFNULL (
			p_expir_at, 
			fun_get_user_subscription_expir(p_subscription_package_id)
		),
		p_actual_cost_usd,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$