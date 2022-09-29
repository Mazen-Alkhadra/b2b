DELIMITER $$
CREATE PROCEDURE `prc_on_offer_status_change` (
	p_offer_id							BIGINT UNSIGNED
)  
BEGIN
  DECLARE v_offer_status VARCHAR(20) DEFAULT NULL;
  DECLARE v_offer_user_id BIGINT UNSIGNED DEFAULT NULL;
  DECLARE v_offer_tender_id BIGINT UNSIGNED DEFAULT NULL;

  SELECT
    status,
    creat_by_user_id,
    tender_id
  INTO 
    v_offer_status,
    v_offer_user_id,
    v_offer_tender_id
  FROM 
    offers
  WHERE
    id_offer = p_offer_id
  ;  

  CALL prc_calc_offers_status(p_offer_id, NULL, TRUE);

  IF v_offer_status = 'ACCEPTED' THEN 
    UPDATE 
		  offers
	  SET
      accepted_at = CURRENT_TIMESTAMP()
    WHERE 
      id_offer = p_offer_id
    ;
  ELSEIF v_offer_status = 'EXECUTED' AND fun_is_tender_b2b(v_offer_tender_id) THEN
     CALL prc_b2b_tender(v_offer_tender_id);
     UPDATE 
		  offers
	  SET
      excuted_at = CURRENT_TIMESTAMP()
    WHERE 
      id_offer = p_offer_id
    ;
  END IF;


END$$