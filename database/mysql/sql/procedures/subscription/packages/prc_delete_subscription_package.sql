DELIMITER $$
CREATE PROCEDURE `prc_delete_subscription_package` (
	p_id_subscription_package		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		subscription_packages
	WHERE
		id_subscription_package = p_id_subscription_package
	;
  
END$$