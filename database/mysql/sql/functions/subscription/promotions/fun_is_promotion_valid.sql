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
      current_timestamp() >= start_at AND
      current_timestamp() < end_at AND 
      (use_count_limit IS NULL OR 
      fun_get_promotion_use_count(id_promotion) <= use_count_limit)
  );

  IF v_is_promotion_valid = FALSE AND p_allow_false <> TRUE THEN 
    CALL prc_throw_exception(NULL, 'InvalidPromotion');
  END IF;
  
  RETURN v_is_promotion_valid;
  
END$$