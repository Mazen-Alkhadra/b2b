DELIMITER $$
CREATE FUNCTION `fun_is_record_seen_by_user` (
    p_record_id     BIGINT UNSIGNED,
    p_user_id       BIGINT UNSIGNED,
    p_type          VARCHAR(50)
)
RETURNS BOOLEAN
BEGIN

  IF p_user_id IS NULL OR p_record_id IS NULL THEN 
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 
      TRUE
    FROM 
      seen
    WHERE 
      record_id = p_record_id AND 
      user_id = p_user_id AND 
      type = p_type
  )
  ;
  
END$$