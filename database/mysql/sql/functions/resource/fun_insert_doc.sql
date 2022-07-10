DELIMITER $$
CREATE FUNCTION `fun_insert_doc` (
  p_url             VARCHAR(500),
  p_size_in_bytes   INT UNSIGNED
)
RETURNS BIGINT UNSIGNED
BEGIN
    
  DECLARE id_doc BIGINT UNSIGNED DEFAULT (
    SELECT id_doc from docs WHERE url = p_url LIMIT 1
  );
  
  IF p_url IS NULL THEN 
    RETURN NULL;
  END IF;

  IF id_doc IS NULL THEN 
    
    INSERT INTO docs (
      url
    ) 
    VALUES (
      p_url
    );

    SET id_doc = LAST_INSERT_ID();

  END IF;

  RETURN id_doc;

END$$