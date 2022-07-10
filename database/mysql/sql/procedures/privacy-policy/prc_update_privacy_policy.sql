DELIMITER $$
CREATE PROCEDURE `prc_update_privacy_policy` (
	p_id_privacy_policy		BIGINT UNSIGNED,
	p_is_active		        BOOLEAN
)  
BEGIN

	UPDATE 
		privacy_policy
	SET
		is_active = IFNULL(p_is_active, is_active)
	WHERE
		id_privacy_policy = p_id_privacy_policy
	;
  
END$$