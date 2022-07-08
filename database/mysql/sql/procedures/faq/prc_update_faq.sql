DELIMITER $$
CREATE PROCEDURE `prc_update_faq` (
	p_id_faq			BIGINT UNSIGNED,
	p_is_active		BOOLEAN
)  
BEGIN

	UPDATE 
		faqs
	SET
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_faq = p_id_faq
	;
  
END$$