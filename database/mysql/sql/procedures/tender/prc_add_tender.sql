DELIMITER $$
CREATE PROCEDURE `prc_add_tender` (
	p_creat_by_user_id      BIGINT UNSIGNED,
	p_name                  LONGTEXT,
	p_product_id						BIGINT UNSIGNED,
	p_quantity							DOUBLE,
	p_from									DATETIME,
	p_to										DATETIME,
	p_delivery_address			LONGTEXT,
	p_status                VARCHAR(20),
	p_closed_at							DATETIME,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		tenders (
			creat_by_user_id,
			name,
			product_id,
			quantity,
			`from`,
			`to`,
			delivery_address,
			status,
			closed_at
		)
	VALUES (
		p_creat_by_user_id,
		p_name,
		p_product_id,
		p_quantity,
		p_from,
		p_to,
		p_delivery_address,
		IFNULL(p_status, DEFAULT(status)),
		p_closed_at
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$