DELIMITER $$
CREATE PROCEDURE `prc_update_tender` (
	p_id_tender					BIGINT UNSIGNED,
	p_creat_by_user_id  BIGINT UNSIGNED,
	p_name              LONGTEXT,
	p_product_id				BIGINT UNSIGNED,
	p_quantity					DOUBLE,
	p_from							DATETIME,
	p_to								DATETIME,
	p_delivery_address	LONGTEXT,
	p_closed_at					DATETIME
)  
BEGIN

	UPDATE 
		tenders
	SET
		creat_by_user_id = IFNULL(p_creat_by_user_id, creat_by_user_id),
	  name = IFNULL(p_name, name),
		product_id = IFNULL(p_product_id, product_id),
		quantity = IFNULL(p_quantity, quantity),
		`from` = IFNULL(p_from, `from`),
		`to` = IFNULL(p_to, `to`),
		delivery_address = IFNULL(p_delivery_address, delivery_address),
		closed_at = IFNULL(p_closed_at, closed_at)
	WHERE
		id_tender = p_id_tender
	;
  
END$$