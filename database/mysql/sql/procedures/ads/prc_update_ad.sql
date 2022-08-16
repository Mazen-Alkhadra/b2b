DELIMITER $$
CREATE PROCEDURE `prc_update_ad` (
	p_id_ad               BIGINT UNSIGNED,
	p_img_url             BIGINT UNSIGNED,
	p_url               	LONGTEXT,
	p_duration_ms         BIGINT UNSIGNED,
	p_is_active           BOOLEAN,
)  
BEGIN

	UPDATE 
		ads
	SET
		img_id = IF(p_img_url IS NULL, img_id, fun_insert_img(p_img_url)),
		url = IFNULL(p_url, url),
		duration_ms = IFNULL(p_duration_ms, duration_ms),
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_ad = p_id_ad
	;
  
END$$