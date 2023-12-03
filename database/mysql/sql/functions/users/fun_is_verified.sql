DELIMITER $$
CREATE FUNCTION `fun_is_verified` (
  p_login_name       VARCHAR(200),
  p_user_id          BIGINT UNSIGNED,
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN

  DECLARE v_is_user_mobile_verified BOOLEAN DEFAULT FALSE;
  DECLARE v_is_user_email_verified  BOOLEAN DEFAULT FALSE;
  DECLARE v_err_code    VARCHAR(200) DEFAULT NULL;

  IF p_user_id IS NOT NULL THEN 
    SELECT 
      is_email_verified,
      is_mobile_verified
    INTO 
      v_is_user_email_verified,
      v_is_user_mobile_verified
    FROM 
      users 
    WHERE 
      id_user = p_user_id
    ;

    IF !v_is_user_email_verified && !v_is_user_mobile_verified THEN
      SET v_err_code = 'UnVerifiedMailMobile';
    ELSEIF !v_is_user_email_verified THEN
      SET v_err_code = 'UnVerifiedMail';
    ELSEIF !v_is_user_mobile_verified THEN
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