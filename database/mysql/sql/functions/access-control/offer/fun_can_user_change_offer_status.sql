DELIMITER $$
CREATE FUNCTION `fun_can_user_change_offer_status` (
  p_user_id          BIGINT UNSIGNED,
  p_offer_id         BIGINT UNSIGNED,
  p_new_status       VARCHAR(50),
  p_allow_false      BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  IF p_user_id IS NOT NULL AND NOT EXISTS (
    SELECT 
      id_offer 
    FROM 
      offers o
      INNER JOIN tenders t ON o.tender_id = t.id_tender 
    WHERE 
      id_offer = p_offer_id AND
      t.creat_by_user_id = p_user_id
  ) THEN
    IF p_allow_false THEN 
      RETURN FALSE;
    ELSE 
      CALL prc_throw_exception(NULL, 'AccessDenied');
    END IF;
  END IF;

  IF p_new_status IS NULL OR 
    p_offer_id IS NULL OR 
    !fun_is_offer_new_status_valid(p_offer_id, p_new_status, p_allow_false) OR 
    !fun_is_offer_have_time(p_offer_id, p_allow_false)
  THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;

END$$