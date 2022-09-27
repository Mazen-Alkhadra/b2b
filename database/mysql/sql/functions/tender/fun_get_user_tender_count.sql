DELIMITER $$
CREATE FUNCTION `fun_get_user_tender_count` (
    p_user_id             BIGINT UNSIGNED,
    p_duration_days       BIGINT UNSIGNED
)
RETURNS DOUBLE
BEGIN
  
  IF p_duration_days = 1 THEN 
    RETURN (
      SELECT 
        COUNT(*)
      FROM 
        tenders
      WHERE 
        creat_by_user_id = p_user_id AND 
        DATE(CURRENT_TIMESTAMP()) = DATE(creat_at) 
    );
  ELSEIF p_duration_days = 30 THEN 
    RETURN (
      SELECT 
        COUNT(*)
      FROM 
        tenders
      WHERE 
        creat_by_user_id = p_user_id AND 
        MONTH(CURRENT_TIMESTAMP()) = MONTH(creat_at) AND 
        YEAR(CURRENT_TIMESTAMP()) = YEAR(creat_at)
    );
  ELSE 
    RETURN (
      SELECT 
        COUNT(*)
      FROM 
        tenders
      WHERE 
        creat_by_user_id = p_user_id AND 
        creat_at > DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL p_duration_days DAY)
    );
  END IF;


END$$