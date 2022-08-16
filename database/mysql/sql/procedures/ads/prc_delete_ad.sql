DELIMITER $$
CREATE PROCEDURE `prc_delete_ad` (
	p_id_ad		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		ads
	WHERE
		id_ad = p_id_ad
	;
  
END$$