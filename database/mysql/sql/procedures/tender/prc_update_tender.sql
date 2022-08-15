DELIMITER $$
CREATE PROCEDURE `prc_update_tender` (
	p_id_tender					BIGINT UNSIGNED,
	p_creat_by_user_id  BIGINT UNSIGNED,
	p_name              LONGTEXT,
	p_product_id				BIGINT UNSIGNED,
	p_quantity					DOUBLE,
	p_from							DATETIME,
	p_to								DATETIME,
	p_deliver_before    DATETIME,
	p_city_id           BIGINT UNSIGNED,
  p_area              LONGTEXT,
  p_street            LONGTEXT,
  p_building_number   LONGTEXT,
  p_address_longitude LONGTEXT,
  p_address_latitude  LONGTEXT,              
  p_more_address_info LONGTEXT,
	p_status            VARCHAR(20),
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
		deliver_before = IFNULL(p_deliver_before, deliver_before),
		p_city_id = IFNULL(p_city_id, city_id),
	  p_area = IFNULL(p_area, area),
  	p_street = IFNULL(p_street, street),
  	p_building_number = IFNULL(p_building_number, building_number),
  	p_address_longitude = IFNULL(p_address_longitude, address_longitude),
  	p_address_latitude = IFNULL(p_address_latitude, address_latitude),              
  	p_more_address_info = IFNULL(p_more_address_info, more_address_info),
		status = IFNULL(p_status, status),
		closed_at = IFNULL(p_closed_at, closed_at)
	WHERE
		id_tender = p_id_tender
	;
  
END$$