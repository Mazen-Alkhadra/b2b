DELIMITER $$
CREATE PROCEDURE `prc_delete_notify_devices` (
  p_device_id      BIGINT UNSIGNED,
  p_user_id        BIGINT UNSIGNED,
  p_token          LONGTEXT
)  
BEGIN

  DELETE FROM 
    notify_devices
  WHERE 
    id_device = p_device_id OR
    user_id = p_user_id OR 
    token = p_token
  ;
  
END$$