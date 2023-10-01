DELIMITER $$
CREATE PROCEDURE `prc_add_to_seen` (
	p_record_id            BIGINT UNSIGNED,
  p_user_id              BIGINT UNSIGNED,
  p_type                 VARCHAR(50)
)  
BEGIN

	INSERT INTO 
		seen (
			record_id,
			user_id,
      type
		)
	VALUES (
		p_record_id,
    p_user_id,
    p_type
	)
	ON DUPLICATE KEY UPDATE user_id = user_id
	;

END$$