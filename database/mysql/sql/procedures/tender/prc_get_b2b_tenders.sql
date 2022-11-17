DELIMITER $$
CREATE PROCEDURE `prc_get_b2b_tenders` (
	p_user_id   BIGINT UNSIGNED
)  
BEGIN

	SELECT
        id_tender	idTender,
        t.creat_by_user_id  tenderCreatorUserId, 
        name,
		product_id	productId,
        fun_get_string(NULL, p.name_str_id) productName,
        fun_get_img(p.img_id) productImgUrl,
        fun_get_string(NULL, b.name_str_id) brandName,
        fun_get_string(NULL, c.name_str_id) categoryName,
		t.quantity tenderQuantity,
		`from`,
		`to`,
        city_id cityId,
        area,
        street,
        building_number buildingNumber,
        address_longitude addressLongitude,
        address_latitude addressLatitude,
        more_address_info moreAddressInfo,
        supplier_location supplierLocation,
        t.status,
		closed_at closedAt
    FROM
        tenders t
        INNER JOIN offers o ON tender_id = id_tender
        INNER JOIN products p ON id_product = product_id
        INNER JOIN brands b ON p.brand_id = id_brand
        INNER JOIN categories c ON c.id_category = b.category_id
    WHERE 
      (
        o.status = 'EXECUTED' AND 
        o.creat_by_user_id = p_user_id AND 
        fun_is_tender_b2b(tender_id)
      ) OR 
      ( 
        t.creat_by_user_id = p_user_id AND 
        fun_is_tender_b2b(id_tender)
      ) 
    ;

END$$