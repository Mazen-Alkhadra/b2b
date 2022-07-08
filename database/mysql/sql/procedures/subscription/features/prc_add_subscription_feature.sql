DELIMITER $$
CREATE PROCEDURE `prc_add_subscription_feature` (
	p_id_subscription_feature		VARCHAR(50),
	p_name_str_id								BIGINT UNSIGNED,
	p_description_str_id				BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		subscription_features (
			id_subscription_feature,
			name_str_id,
			description_str_id
		)
	VALUES (
		p_id_subscription_feature,
		p_name_str_id,
		p_description_str_id
	)
	;
  
END$$