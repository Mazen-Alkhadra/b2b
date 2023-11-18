DELIMITER $$
CREATE PROCEDURE `prc_add_verified` (
	p_login_name          VARCHAR(200)
)  
BEGIN

	INSERT INTO 
		verified (
			login_name
		)
	VALUES (
		p_login_name
	) ON DUPLICATE KEY UPDATE login_name = login_name
	;
  
END$$