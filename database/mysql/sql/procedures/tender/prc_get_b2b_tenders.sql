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
      fun_get_offers_cnt_on_tender(id_tender) offersCnt,
		  t.quantity tenderQuantity,
		  `from`,
		  `to`,
      t.city_id cityId,
      t.area,
      t.street,
      t.building_number buildingNumber,
      t.address_longitude addressLongitude,
      t.address_latitude addressLatitude,
      t.more_address_info moreAddressInfo,
      t.supplier_location supplierLocation,
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