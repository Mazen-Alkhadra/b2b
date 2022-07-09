DELIMITER $$
CREATE FUNCTION `fun_is_user_subscription_valid` (
    p_subscription_id BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  
  RETURN EXISTS (
    SELECT 
      id_subscription 
    FROM 
      subscriptions s 
      INNER JOIN payments p ON p.id_payment = s.payment_id 
    WHERE 
      s.id_subscription = p_subscription_id AND
      s.is_active = TRUE AND 
      (s.expir_at IS NULL OR s.expir_at > CURRENT_TIMESTAMP()) AND 
      p.status = 'COMPLETED' 
  );

END$$