DELIMITER $$
CREATE PROCEDURE `prc_add_subscription_packages_feature` (
	p_subscription_package_id		BIGINT UNSIGNED,
	p_subscription_feature_id		VARCHAR(50),
	p_feature_value							DOUBLE
)  
BEGIN

	INSERT INTO 
		subscription_packages_features (
			subscription_package_id,
			subscription_feature_id,
			feature_value
		)
	VALUES (
		p_subscription_package_id,
		p_subscription_feature_id,
		p_feature_value
	)
	;

END$$