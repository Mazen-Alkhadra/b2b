DELIMITER $$
CREATE PROCEDURE `prc_remove_from_trash` (
  p_id                   BIGINT UNSIGNED,
	p_record_id            BIGINT UNSIGNED,
  p_user_id              BIGINT UNSIGNED,
  p_type                 VARCHAR(50)
)  
BEGIN

	DELETE FROM  
		trash 
	WHERE 
    (p_id IS NOT NULL AND id = p_id) OR 
		(
      record_id = p_record_id AND
      user_id = p_user_id AND
      type = p_type
    )
	;

END$$