DELIMITER $$
CREATE PROCEDURE `prc_add_offer` (
	p_tender_id								BIGINT UNSIGNED,
	p_price_USD								DOUBLE,
	p_b_include_delivery			BOOLEAN,
	p_delivery_cost						DOUBLE,
	p_delivery_address				LONGTEXT,
	p_status									VARCHAR(20),
	p_accepted_at							DATETIME,
	p_excuted_at							DATETIME,
	OUT p_out_new_rec_id			BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		offers (
			tender_id,
			price_USD,
			b_include_delivery,
			delivery_cost,
			delivery_address,
			status,
			accepted_at,
			excuted_at
		)
	VALUES (
		p_tender_id,
		p_price_USD,
		p_b_include_delivery,
		p_delivery_cost,
		p_delivery_address,
		IFNULL(p_status, DEFAULT(status)),
		p_accepted_at,
		p_excuted_at
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$