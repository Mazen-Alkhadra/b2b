DELIMITER $$
CREATE PROCEDURE `prc_add_ad` (
	p_img_url             BIGINT UNSIGNED,
	p_url               	LONGTEXT,
	p_duration_ms         BIGINT UNSIGNED,
	p_is_active           BOOLEAN,
	OUT p_out_new_rec_id	BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		ads (
			img_id,
			url,
			duration_ms,
			is_active
		)
	VALUES (
		fun_insert_img(p_img_url),
		p_url,
		p_duration_ms,
		IFNULL(p_is_active, DEFAULT(is_active))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$