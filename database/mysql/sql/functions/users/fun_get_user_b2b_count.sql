DELIMITER $$
CREATE FUNCTION `fun_get_user_b2b_count` (
    p_user_id             BIGINT UNSIGNED
)
RETURNS DOUBLE
BEGIN
  RETURN (
    SELECT 
      COUNT(DISTINCT id_tender)
    FROM 
      tenders t
      INNER JOIN offers o ON tender_id = id_tender
    WHERE 
      (
        o.status = 'EXECUTED' AND 
        o.creat_by_user_id = p_user_id AND 
        fun_is_tender_b2b(tender_id)
      ) OR 
      ( 
        t.creat_by_user_id = p_user_id AND 
        fun_is_tender_b2b(id_tender)
      ) 
  )
  ;

END$$