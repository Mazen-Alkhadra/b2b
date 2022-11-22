DELIMITER $$
CREATE FUNCTION `fun_is_user_care_product` (
    p_user_id          BIGINT UNSIGNED,
    p_product_id       BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN

DECLARE v_product_brand_id BIGINT UNSIGNED DEFAULT NULL;
DECLARE v_product_category_id BIGINT UNSIGNED DEFAULT NULL;

SELECT 
    id_brand,
    category_id
INTO 
    v_product_brand_id,
    v_product_category_id
FROM 
    products 
    LEFT JOIN brands ON brand_id = id_brand 
WHERE 
    id_product = p_product_id
;

RETURN EXISTS (
    SELECT 
      *
    FROM 
     users_cares
    WHERE 
      user_id = p_user_id AND (
				product_id = p_product_id OR 
				brand_id = v_product_brand_id OR 
				category_id = v_product_category_id
			) 
  );

END$$