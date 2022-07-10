DELIMITER $$
CREATE PROCEDURE `prc_add_privacy_policy` (
	p_content_str_id			BIGINT UNSIGNED,
	p_is_active						BOOLEAN,
	OUT p_out_new_rec_id	BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		privacy_policy (
			content_str_id,
			is_active
		)
	VALUES (
		p_content_str_id,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$