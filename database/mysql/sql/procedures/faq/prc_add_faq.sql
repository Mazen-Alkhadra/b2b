DELIMITER $$
CREATE PROCEDURE `prc_add_faq` (
	p_question_str_id			BIGINT UNSIGNED,
	p_answer_str_id				BIGINT UNSIGNED,
	p_is_active						BOOLEAN,
	OUT p_out_new_rec_id	BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		faqs (
			question_str_id,
			answer_str_id,
			is_active
		)
	VALUES (
		p_question_str_id,
		p_answer_str_id,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$