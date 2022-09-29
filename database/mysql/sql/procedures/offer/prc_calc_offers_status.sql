DELIMITER $$
CREATE PROCEDURE `prc_calc_offers_status` (
	p_offer_id							BIGINT UNSIGNED,
  p_tender_id             BIGINT UNSIGNED,
	p_chk_offer_tender      BOOLEAN
)  
BEGIN

	IF p_offer_id IS NOT NULL AND p_chk_offer_tender THEN 
		SET p_tender_id = (SELECT tender_id FROM offers WHERE id_offer = p_offer_id);
	END IF;

	UPDATE 
		offers 
	SET 
		status = 'REJECTED'
	WHERE 
		(p_offer_id IS NULL OR id_offer = p_offer_id) AND 
		(p_tender_id IS NULL OR tender_id = p_tender_id) AND 
		fun_is_offer_new_status_valid(p_offer_id, 'REJECTED', TRUE) AND 
    (
			!fun_is_offer_have_time(p_offer_id, TRUE) OR 
			fun_is_tender_complete_qntity(p_tender_id, FALSE)
		)
	;

END$$