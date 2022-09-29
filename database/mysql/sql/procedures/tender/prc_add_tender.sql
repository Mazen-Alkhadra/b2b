DELIMITER $$
CREATE PROCEDURE `prc_add_tender` (
	p_creat_by_user_id      BIGINT UNSIGNED,
	p_name                  LONGTEXT,
	p_product_id						BIGINT UNSIGNED,
	p_quantity							DOUBLE,
	p_from									DATETIME,
	p_to										DATETIME,
	p_deliver_before        DATETIME,
	p_city_id               BIGINT UNSIGNED,
  p_area                  LONGTEXT,
  p_street                LONGTEXT,
  p_building_number       LONGTEXT,
  p_address_longitude     LONGTEXT,
  p_address_latitude      LONGTEXT,              
  p_more_address_info     LONGTEXT,
	p_supplier_location     VARCHAR(20),
	p_status                VARCHAR(20),
	p_tax                   DOUBLE,
	p_pay_method            VARCHAR(20),
	p_closed_at							DATETIME,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	SET @_ = fun_can_user_create_tender(p_creat_by_user_id, FALSE);
	SET @_ = fun_is_tender_info_valid(NULL, p_from, p_to, FALSE);
	
	INSERT INTO 
		tenders (
			creat_by_user_id,
			name,
			product_id,
			quantity,
			`from`,
			`to`,
			deliver_before,
			city_id,               
  		area,                  
  		street,                
  		building_number,       
  		address_longitude,     
  		address_latitude,      
  		more_address_info,    
			supplier_location, 
			status,
			tax,
			pay_method,
			closed_at
		)
	VALUES (
		p_creat_by_user_id,
		p_name,
		p_product_id,
		p_quantity,
		p_from,
		p_to,
		p_deliver_before,
		p_city_id,               
  	p_area,                  
  	p_street,                
  	p_building_number,       
  	p_address_longitude,     
  	p_address_latitude,      
  	p_more_address_info,   
		IFNULL(p_supplier_location, DEFAULT(supplier_location)),
		IFNULL(p_status, DEFAULT(status)),
		p_tax,
		IFNULL(p_pay_method, DEFAULT(pay_method)),
		p_closed_at
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$