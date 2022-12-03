DELIMITER $$
CREATE PROCEDURE `prc_add_notify_device` (
  p_user_id        BIGINT UNSIGNED,
  p_token          LONGTEXT,
  OUT out_new_id   BIGINT UNSIGNED
)  
_prc: BEGIN

  IF EXISTS (SELECT id_device FROM notify_devices WHERE token = p_token) THEN 
    CALL prc_delete_notify_devices(NULL, NULL, p_token);
  END IF;

  INSERT INTO 
    notify_devices (
      user_id,
      token
    )
  VALUES (
    p_user_id,
    p_token
  )
  ;

  SET out_new_id = LAST_INSERT_ID();
  SELECT out_new_id AS newId;
  
END$$