DELIMITER $$
CREATE FUNCTION `fun_is_verified` (
  p_login_name       VARCHAR(200),
  p_user_id          BIGINT UNSIGNED,
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN

  DECLARE v_user_mobile VARCHAR(200) DEFAULT NULL;
  DECLARE v_user_email  VARCHAR(200) DEFAULT NULL;
  DECLARE v_err_code    VARCHAR(200) DEFAULT NULL;

  IF p_user_id IS NOT NULL THEN 
    SELECT 
      email,
      mobile
    INTO 
      v_user_email,
      v_user_mobile
    FROM 
      users 
    WHERE 
      id_user = p_user_id
    ;

    IF !EXISTS(SELECT TRUE FROM verified WHERE login_name = v_user_email) THEN
      SET v_err_code = 'UnVerifiedMail';
    ELSEIF !EXISTS(SELECT TRUE FROM verified WHERE login_name = v_user_mobile) THEN
      SET v_err_code = 'UnVerifiedMobile';
    END IF;

  
  ELSEIF p_login_name IS NOT NULL AND !EXISTS (
    SELECT 
      TRUE
    FROM 
      verified
    WHERE 
      login_name = p_login_name
  ) THEN 
    SET v_err_code = 'UnVerifiedLoginName';

  END IF;
  
  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$