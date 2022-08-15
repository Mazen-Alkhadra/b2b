DELIMITER $$
CREATE FUNCTION `fun_get_promotion_use_count` (
    p_promotion_id    BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_ret BIGINT UNSIGNED DEFAULT NULL;
  
  SELECT 
    COUNT(*) 
  INTO 
    v_ret
  FROM 
    subscriptions
  WHERE 
    promotion_id = p_promotion_id
  ;

  RETURN v_ret;
  
END$$