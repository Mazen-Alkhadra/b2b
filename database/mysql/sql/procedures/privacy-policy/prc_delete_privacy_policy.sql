DELIMITER $$
CREATE PROCEDURE `prc_delete_privacy_policy` (
	p_id_privacy_policy		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		privacy_policy
	WHERE
		id_privacy_policy = p_id_privacy_policy
	;
  
END$$