DELIMITER $$
CREATE FUNCTION `fun_is_tender_info_valid` (
  p_tender_id      BIGINT UNSIGNED,
  p_from           DATETIME,
  p_to             DATETIME,
  p_allow_false    BOOLEAN 
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_err_code VARCHAR(100) DEFAULT NULL;

  IF p_tender_id IS NOT NULL THEN 
    SELECT 
      `from`,
      `to` 
    INTO 
      p_from,
      p_to
    FROM 
      tenders
    WHERE 
      id_tender = p_tender_id
    ;
  END IF;

  IF DATE_ADD(
		p_from, 
		INTERVAL fun_get_setting_val('MAX_TENDER_DURATION_SEC') SECOND
	) < p_to THEN
	  SET v_err_code = 'ExceedMaxTenderTimeSetting';
	END IF;

  IF v_err_code IS NOT NULL AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, v_err_code);
  END IF;

  RETURN v_err_code IS NULL;

END$$