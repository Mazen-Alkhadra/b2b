DELIMITER $$
CREATE PROCEDURE `prc_delete_subscription_feature` (
	p_id_subscription_feature		VARCHAR(50)
)  
BEGIN

	DELETE FROM 
		subscription_features
	WHERE
		id_subscription_feature = p_id_subscription_feature
	;
  
END$$