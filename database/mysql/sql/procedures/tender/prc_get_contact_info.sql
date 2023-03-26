DELIMITER $$
CREATE PROCEDURE `prc_get_contact_info` (
	p_user_id   BIGINT UNSIGNED,
  p_offer_id  BIGINT UNSIGNED,
  p_tender_id BIGINT UNSIGNED
)  
BEGIN

  DECLARE v_target_id BIGINT UNSIGNED DEFAULT NULL;

  IF p_offer_id IS NOT NULL THEN
    SELECT 
      id_offer 
    INTO 
      v_target_id
    FROM 
      offers o
      INNER JOIN tenders t ON o.tender_id = t.id_tender
    WHERE 
      id_offer = p_offer_id AND 
      (
        o.creat_by_user_id = p_user_id OR 
        (
          t.creat_by_user_id = p_user_id AND 
          o.status IN ('ACCEPTED', 'EXECUTED')
        )
      )
    ;  

    IF v_target_id IS NULL THEN 
	    CALL prc_throw_exception(NULL, 'AccessDenied');
    END IF;

    SELECT 
      o.delivery_address deliveryAddress,
      fun_get_string(NULL, cto.name_str_id) offerCityName,
      fun_get_string(NULL, cno.name_str_id) offerCountryName,
      u.email,
      u.mobile,
      u.has_mobile_whatsapp hasMobileWhatsapp,
      fun_get_string(NULL, c.name_str_id) companyName,
      fun_get_string(NULL, ctc.name_str_id) companyCityName,
      fun_get_string(NULL, cnc.name_str_id) companyCountryName,
      c.area companyArea,
      c.street companyStreet,
      c.building_number companyBuildingNumber,
      c.address_longitude companyAddressLong,
      c.address_latitude companyAddressLat,
      c.more_address_info companyMoreAddressInfo
    FROM 
      offers o 
      INNER JOIN users u ON o.creat_by_user_id = u.id_user
      LEFT JOIN companies c ON c.id_company = u.company_id
      LEFT JOIN cities cto ON cto.id_city = o.city_id
      LEFT JOIN countries cno ON cto.country_id = cno.id_country
      LEFT JOIN cities ctc ON ctc.id_city = c.city_id
      LEFT JOIN countries cnc ON cnc.id_country = ctc.country_id
    WHERE 
      id_offer = v_target_id
    ;

  ELSEIF p_tender_id IS NOT NULL THEN 

    SELECT 
      id_tender 
    INTO 
      v_target_id
    FROM 
      tenders t 
      INNER JOIN offers o ON o.tender_id = t.id_tender
    WHERE 
      id_tender = p_tender_id AND 
      (
        t.creat_by_user_id = p_user_id OR 
        (
          o.creat_by_user_id = p_user_id AND 
          o.status IN ('ACCEPTED', 'EXECUTED')
        )
      )
    LIMIT 1
    ;  

    IF v_target_id IS NULL THEN 
	    CALL prc_throw_exception(NULL, 'AccessDenied');
    END IF;

    SELECT 
      fun_get_string(NULL, ctt.name_str_id) tenderCityName,
      fun_get_string(NULL, cnt.name_str_id) tenderCountryName,
      t.area tenderArea,  
      t.street tenderStreet,
      t.building_number tenderBuildingNo,
      t.address_longitude tenderLongitude,
      t.address_latitude tenderLatitude,
      t.more_address_info tenderMoreAddressInfo,
      t.supplier_location tenderSupplierLocation,
      u.email,
      u.mobile,
      u.has_mobile_whatsapp hasMobileWhatsapp,
      fun_get_string(NULL, c.name_str_id) companyName,
      fun_get_string(NULL, ctc.name_str_id) companyCityName,
      fun_get_string(NULL, cnc.name_str_id) companyCountryName,
      c.area companyArea,
      c.street companyStreet,
      c.building_number companyBuildingNumber,
      c.address_longitude companyAddressLong,
      c.address_latitude companyAddressLat,
      c.more_address_info companyMoreAddressInfo
    FROM 
      tenders t 
      INNER JOIN users u ON t.creat_by_user_id = u.id_user
      LEFT JOIN companies c ON c.id_company = u.company_id
      LEFT JOIN cities ctt ON ctt.id_city = t.city_id
      LEFT JOIN countries cnt ON ctt.country_id = cnt.id_country
      LEFT JOIN cities ctc ON ctc.id_city = c.city_id
      LEFT JOIN countries cnc ON cnc.id_country = ctc.country_id
    WHERE 
      id_tender = v_target_id
    ;

  END IF;

END$$