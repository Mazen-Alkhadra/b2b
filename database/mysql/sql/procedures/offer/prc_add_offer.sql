DELIMITER $$
CREATE PROCEDURE `prc_add_offer` (
	p_tender_id							BIGINT UNSIGNED,
	p_creat_by_user_id  		BIGINT UNSIGNED,
	p_quantity          		DOUBLE,
	p_price_USD							DOUBLE,
	p_b_include_delivery		BOOLEAN,
	p_delivery_cost				  DOUBLE,
	p_delivery_address			LONGTEXT,
	p_delivery_at           DATETIME,
	p_status					      VARCHAR(20),
	p_tax                   DOUBLE,
	p_city_id               BIGINT UNSIGNED,
	p_accepted_at				    DATETIME,
	p_excuted_at				    DATETIME,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	SET @_ = fun_can_add_offer(p_creat_by_user_id, p_tender_id, FALSE);

	INSERT INTO 
		offers (
			tender_id,
			creat_by_user_id,
			quantity,
			price_USD,
			b_include_delivery,
			delivery_cost,
			delivery_address,
			delivery_at,
			status,
			tax,
			city_id,
			accepted_at,
			excuted_at
		)
	VALUES (
		p_tender_id,
		p_creat_by_user_id,
		p_quantity,
		p_price_USD,
		p_b_include_delivery,
		p_delivery_cost,
		p_delivery_address,
		p_delivery_at,
		IFNULL(p_status, DEFAULT(status)),
		p_tax,
		p_city_id,
		p_accepted_at,
		p_excuted_at
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$