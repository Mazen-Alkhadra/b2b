DELIMITER $$
CREATE FUNCTION `fun_insert_img` (
  p_url             VARCHAR(500)
)
RETURNS BIGINT UNSIGNED
BEGIN
    
  DECLARE id_img BIGINT UNSIGNED DEFAULT (
    SELECT id_img from imgs WHERE url = p_url LIMIT 1
  );
  
  IF p_url IS NULL THEN 
    RETURN NULL;
  END IF;

  IF id_img IS NULL THEN 
    
    INSERT INTO 
      imgs (
        url
      ) 
    VALUES (
      p_url
    );

    SET id_img = LAST_INSERT_ID();

  END IF;

  RETURN id_img;

END$$