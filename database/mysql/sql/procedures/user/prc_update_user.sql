DELIMITER $$
CREATE PROCEDURE `prc_update_user` (
	p_id_user							BIGINT UNSIGNED,
	p_first_name					VARCHAR(50),
	p_last_name						VARCHAR(50),
	p_email								VARCHAR(100),
	p_mobile							VARCHAR(100),
	p_has_mobile_whatsapp BOOLEAN,
	p_password						VARCHAR(100),
	p_company_id					BIGINT UNSIGNED,
	p_birth_date					BIGINT UNSIGNED,
	p_gender							VARCHAR(20),
	p_img_url							VARCHAR(500),
	p_role_id							VARCHAR(50),
	p_is_blocked					BOOLEAN,
	p_is_active						BOOLEAN,
	p_is_accepted   			BOOLEAN,
	p_last_login_at 			DATETIME,
	p_score               DOUBLE
)  
BEGIN

	IF EXISTS (SELECT * FROM users WHERE email = p_email OR mobile = p_mobile) THEN 
		CALL prc_throw_exception(NULL, 'DuplicateUser'); 
	END IF;
	
	UPDATE 
		users
	SET
		first_name = IFNULL(p_first_name, first_name),
		last_name = IFNULL(p_last_name, last_name),
		email = IFNULL(p_email, email),
		mobile = IFNULL(p_mobile, mobile),
		has_mobile_whatsapp = IFNULL(p_has_mobile_whatsapp, has_mobile_whatsapp),
		password = IFNULL(p_password, password),
		company_id = IFNULL(p_company_id, company_id),
		birth_date = IFNULL(p_birth_date, birth_date),
		gender = IFNULL(p_gender, gender),
		img_id = IF(p_img_url IS NULL, img_id, fun_insert_img(p_img_url)),
		role_id = IFNULL(p_role_id, role_id),
		is_blocked = IFNULL(p_is_blocked, is_blocked),
		is_active = IFNULL(p_is_active, is_active),
		is_accepted = IFNULL(p_is_accepted, is_accepted),
		last_login_at = IFNULL(p_last_login_at, last_login_at),
		score = IFNULL(p_score, score)
	WHERE
		id_user = p_id_user
	;
  
END$$