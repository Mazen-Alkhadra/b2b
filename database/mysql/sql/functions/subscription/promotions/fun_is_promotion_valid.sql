DELIMITER $$
CREATE FUNCTION `fun_is_promotion_valid` (
    p_promotion_id    BIGINT UNSIGNED,
    p_promotion_code  VARCHAR(190),
    p_allow_false     BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_is_promotion_valid BOOLEAN DEFAULT FALSE;
  
  SET v_is_promotion_valid = EXISTS (
    SELECT 
      id_promotion
    FROM 
      promotions
    WHERE 
      (id_promotion = p_promotion_id OR code = p_promotion_code) AND
      is_active = TRUE AND 
      (type <> 'PERIOD_BASED' OR 
        current_timestamp() BETWEEN start_at AND end_at)
  );

  IF v_is_promotion_valid = FALSE AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, 'InvalidPromotion');
  END IF;
  
  RETURN v_is_promotion_valid;
  
END$$