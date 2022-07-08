DELIMITER $$
CREATE PROCEDURE `prc_add_subscription` (
	p_user_id										BIGINT UNSIGNED,
	p_subscription_package_id		BIGINT UNSIGNED,
	p_payment_id								BIGINT UNSIGNED,
	p_promotion_id							BIGINT UNSIGNED,
	p_expir_at									DATETIME,
	p_actual_cost_usd						DOUBLE,
	p_is_active									BOOLEAN,
	OUT p_out_new_rec_id				BIGINT UNSIGNED
)  
BEGIN

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
		p_expir_at,
		p_actual_cost_usd,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$