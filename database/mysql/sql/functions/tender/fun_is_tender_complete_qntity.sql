DELIMITER $$
CREATE FUNCTION `fun_is_tender_complete_qntity` (
  p_tender_id               BIGINT UNSIGNED,
  p_only_executed_offers    BOOLEAN
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_tender_quantity DOUBLE DEFAULT (
    SELECT quantity FROM tenders WHERE id_tender = p_tender_id
  );

  RETURN (
    SELECT 
      IFNULL(SUM(quantity), 0) >= v_tender_quantity
    FROM 
      offers 
    WHERE 
      tender_id = p_tender_id AND 
      (
        (p_only_executed_offers AND status = 'EXECUTED') OR
        (!p_only_executed_offers AND status IN ('ACCEPTED', 'EXECUTED'))
      )
  );
  
END$$