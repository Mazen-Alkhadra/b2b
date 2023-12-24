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
	p_birth_date					DATETIME,
	p_gender							VARCHAR(20),
	p_img_url							VARCHAR(500),
	p_role_id							VARCHAR(50),
	p_is_blocked					BOOLEAN,
	p_is_mobile_verified  BOOLEAN,
	p_is_email_verified   BOOLEAN,
	p_is_accepted   			BOOLEAN,
	p_is_authorized       BOOLEAN,
	p_last_login_at 			DATETIME,
	p_score               DOUBLE,
	p_notes               LONGTEXT
)  
BEGIN

	DECLARE v_user_email VARCHAR(100) DEFAULT NULL;
	DECLARE v_user_mobile VARCHAR(100) DEFAULT NULL;

	IF EXISTS (
		SELECT 
			* 
		FROM 
			users 
		WHERE 
			id_user <> p_id_user AND 
			(email = p_email OR mobile = p_mobile)
	) THEN 
		CALL prc_throw_exception(NULL, 'DuplicateUser'); 
	END IF;

	SELECT 
		email,
		mobile
	INTO 
		v_user_email,
		v_user_mobile
	FROM 
		users 
	WHERE 
		id_user = p_id_user
	;

	IF v_user_email <> p_email THEN 
		SET p_is_email_verified = IFNULL(p_is_email_verified, FALSE);
	END IF;

	IF v_user_mobile <> p_mobile THEN 
		SET p_is_mobile_verified = IFNULL(p_is_mobile_verified, FALSE);
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
		is_mobile_verified = IFNULL(p_is_mobile_verified, is_mobile_verified),
		is_email_verified = IFNULL(p_is_email_verified, is_email_verified),
		is_accepted = IFNULL(p_is_accepted, is_accepted),
		is_authorized = IFNULL(p_is_authorized, is_authorized),
		last_login_at = IFNULL(p_last_login_at, last_login_at),
		score = IFNULL(p_score, score),
		notes = IFNULL(p_notes, notes)
	WHERE
		id_user = p_id_user
	;
  
END$$