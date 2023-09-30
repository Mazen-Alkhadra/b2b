DELIMITER $$
CREATE PROCEDURE `prc_add_to_trash` (
	p_record_id            BIGINT UNSIGNED,
  p_user_id              BIGINT UNSIGNED,
  p_type                 VARCHAR(50)
)  
BEGIN

	INSERT INTO 
		trash (
			record_id,
			user_id,
      type
		)
	VALUES (
		p_record_id,
    p_user_id,
    p_type
	)
	;

END$$