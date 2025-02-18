DELIMITER $$
CREATE PROCEDURE `prc_update_offer` (
	p_id_offer							BIGINT UNSIGNED,
	p_tender_id					  	BIGINT UNSIGNED,
	p_creat_by_user_id      BIGINT UNSIGNED,
	p_quantity              DOUBLE,
	p_price_USD							DOUBLE,
	p_b_include_delivery		BOOLEAN,
	p_delivery_cost		    	DOUBLE,
	p_delivery_address			LONGTEXT,
	p_delivery_at           DATETIME,
	p_status								VARCHAR(20),
	p_tax                   DOUBLE,
	p_city_id         			BIGINT UNSIGNED,
	p_accepted_at						DATETIME,
	p_excuted_at						DATETIME
)  
BEGIN

	SET @_ = fun_can_update_offer(NULL, p_id_offer, p_status, FALSE);
	
	UPDATE 
		offers
	SET
		tender_id = IFNULL(p_tender_id, tender_id),
		creat_by_user_id = IFNULL(p_creat_by_user_id, creat_by_user_id),
		quantity = IFNULL(p_quantity, quantity),
		price_USD = IFNULL(p_price_USD, price_USD),
		b_include_delivery = IFNULL(p_b_include_delivery, b_include_delivery),
		delivery_cost = IFNULL(p_delivery_cost, delivery_cost),
		delivery_address = IFNULL(p_delivery_address, delivery_address),
		delivery_at = IFNULL(p_delivery_at, delivery_at),
		status = IFNULL(p_status, status),
		tax = IFNULL(p_tax, tax),
		city_id = IFNULL(p_city_id, city_id),
		accepted_at = IFNULL(p_accepted_at, accepted_at),
		excuted_at = IFNULL(p_excuted_at, excuted_at)
	WHERE
		id_offer = p_id_offer
	;
  
	IF p_status IS NOT NULL THEN 
		CALL prc_on_offer_status_change(p_id_offer);
	END IF;

END$$