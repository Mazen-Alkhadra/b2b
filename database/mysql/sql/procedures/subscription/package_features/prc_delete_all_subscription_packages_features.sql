DELIMITER $$
CREATE PROCEDURE `prc_delete_all_subscription_packages_features` (
	p_subscription_package_id		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		subscription_packages_features
	WHERE
		subscription_package_id = p_subscription_package_id
	;
  
END$$