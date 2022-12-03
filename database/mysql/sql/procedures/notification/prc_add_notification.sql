DELIMITER $$
CREATE PROCEDURE `prc_add_notification` (
  p_user_id        BIGINT UNSIGNED,
  p_type           VARCHAR(20),
  p_title_str_id   BIGINT UNSIGNED,
  p_content_str_id BIGINT UNSIGNED,
  p_img_url        VARCHAR(500),
  p_creat_at      DATETIME,
  p_read_at        DATETIME,
  OUT out_new_id   BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    notifications (
      user_id,
      `type`,
      title_str_id,
      content_str_id,
      img_id,
      creat_at,
      read_at
    )
  VALUES (
    p_user_id,
    IFNULL(p_type, DEFAULT(`type`)),
    p_title_str_id,
    p_content_str_id,
    fun_insert_img(p_img_url),
    IFNULL(p_creat_at, CURRENT_TIMESTAMP()),
    p_read_at
  )
  ;

  SET out_new_id = LAST_INSERT_ID();

  SELECT out_new_id AS newId;
  
END$$