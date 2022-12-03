DELIMITER $$
CREATE PROCEDURE `prc_update_notification` (
  p_notification_id   BIGINT UNSIGNED,
  p_user_id           BIGINT UNSIGNED,
  p_type              VARCHAR(20),
  p_img_url           VARCHAR(500),
  p_read_at           DATETIME
)  
BEGIN

  UPDATE 
    notifications
  SET 
    user_id = IFNULL(p_user_id, user_id),
    type = IFNULL(p_type, type),
    img_id = IF(p_img_url IS NULL, img_id, fun_insert_img(p_img_url)),
    read_at = IFNULL(p_read_at, read_at)    
  WHERE 
    id_notification = p_notification_id
  ;

END$$