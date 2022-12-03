DELIMITER $$
CREATE PROCEDURE `prc_delete_notification` (
  p_notification_id   BIGINT UNSIGNED
)  
BEGIN

  DELETE FROM 
    notifications
  WHERE 
    id_notification = p_notification_id
  ;
  
END$$