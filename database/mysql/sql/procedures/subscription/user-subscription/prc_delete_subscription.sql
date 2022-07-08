DELIMITER $$
CREATE PROCEDURE `prc_delete_subscription` (
	p_id_subscription		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		subscriptions
	WHERE
		id_subscription = p_id_subscription
	;
  
END$$