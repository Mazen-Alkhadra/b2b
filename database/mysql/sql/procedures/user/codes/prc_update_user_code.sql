DELIMITER $$
CREATE PROCEDURE `prc_update_user_code` (
	p_id_code						BIGINT UNSIGNED,
	p_user_id						BIGINT UNSIGNED,
	p_login_name        VARCHAR(200),
	p_code							VARCHAR(190),
	p_type							VARCHAR(20),
	p_is_active					BOOLEAN,
	p_expiry_date_time	DATETIME
)  
BEGIN

	UPDATE 
		users_codes
	SET
		user_id = IFNULL(p_user_id, user_id),
		login_name = IFNULL(p_login_name, login_name),
		code = IFNULL(p_code, code),
		type = IFNULL(p_type, type),
		is_active = IFNULL(p_is_active, is_active),
		expiry_date_time = IFNULL(p_expiry_date_time, expiry_date_time)
	WHERE
		id_code = p_id_code
	;
  
END$$