DELIMITER $$
CREATE PROCEDURE `prc_delete_verified` (
	p_login_name          VARCHAR(200)
)  
BEGIN

	DELETE FROM 
		verified 
	WHERE 
	  login_name = p_login_name
	;
  
END$$