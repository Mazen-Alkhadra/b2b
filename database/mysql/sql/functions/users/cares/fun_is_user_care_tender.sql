DELIMITER $$
CREATE FUNCTION `fun_is_user_care_tender` (
    p_user_id          BIGINT UNSIGNED,
    p_tender_id       BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN 

DECLARE v_tender_product_id BIGINT UNSIGNED DEFAULT NULL;

SELECT 
    product_id
INTO 
    v_tender_product_id
FROM 
    tenders 
WHERE 
    id_tender = p_tender_id
;

RETURN fun_is_user_care_product(p_user_id, v_tender_product_id);

END$$