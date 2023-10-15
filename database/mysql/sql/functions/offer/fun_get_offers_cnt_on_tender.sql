DELIMITER $$
CREATE FUNCTION `fun_get_offers_cnt_on_tender` (
    p_tender_id           BIGINT UNSIGNED
)
RETURNS DOUBLE
BEGIN
    RETURN (
      SELECT 
        COUNT(*) 
      FROM 
        offers 
      WHERE 
        tender_id = p_tender_id
    );
END$$