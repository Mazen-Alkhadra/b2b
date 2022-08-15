DELIMITER $$
CREATE FUNCTION `fun_consume_promotion` (
    p_promotion_id          BIGINT UNSIGNED,
    p_promotion_code        VARCHAR(190)        
)
RETURNS BIGINT UNSIGNED
BEGIN
  
  DECLARE v_promotion_id BIGINT UNSIGNED DEFAULT (
    SELECT 
      id_promotion
    FROM 
      promotions
    WHERE 
      (id_promotion = p_promotion_id OR code = p_promotion_code) AND
      fun_is_promotion_valid(id_promotion, p_promotion_code, FALSE)
    LIMIT 1
  );
  
  RETURN v_promotion_id;

END$$