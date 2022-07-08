DELIMITER $$
CREATE PROCEDURE `prc_delete_faq` (
	p_id_faq		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		faqs
	WHERE
		id_faq = p_id_faq
	;
  
END$$