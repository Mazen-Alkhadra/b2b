DELIMITER $$
CREATE PROCEDURE `prc_add_user` (
	p_first_name						VARCHAR(50),
	p_last_name							VARCHAR(50),
	p_email									VARCHAR(100),
	p_mobile								VARCHAR(100),
	p_has_mobile_whatsapp   BOOLEAN,
	p_password							VARCHAR(100),
	p_company_id						BIGINT UNSIGNED,
	p_birth_date						DATETIME,
	p_gender								VARCHAR(20),
	p_img_url								VARCHAR(500),
	p_role_id								VARCHAR(50),
	p_is_blocked						BOOLEAN,
	p_is_active							BOOLEAN,
	p_notes                 LONGTEXT,
	OUT p_out_new_rec_id		BIGINT UNSIGNED
)  
BEGIN

	IF EXISTS (SELECT * FROM users WHERE email = p_email OR mobile = p_mobile) THEN 
		CALL prc_throw_exception(NULL, 'DuplicateUser'); 
	END IF;

	INSERT INTO 
		users (
			first_name,
			last_name,
			email,
			mobile,
			has_mobile_whatsapp,
			password,
			company_id,
			birth_date,
			gender,
			img_id,
			role_id,
			is_blocked,
			is_active,
			notes
		)
	VALUES (
		p_first_name,
		p_last_name,
		p_email,
		p_mobile,
		IFNULL(p_has_mobile_whatsapp, DEFAULT(has_mobile_whatsapp)),
		p_password,
		p_company_id,
		p_birth_date,
		p_gender,
		fun_insert_img(p_img_url),
		IFNULL(p_role_id, 'NORMAL_USER'),
		IFNULL(p_is_blocked, DEFAULT(is_blocked)),
		IFNULL(p_is_active, DEFAULT(is_active)),
		p_notes
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$