DELIMITER $$
CREATE PROCEDURE `prc_add_role` (
	p_id_role   						VARCHAR(50),
	p_name	              	VARCHAR(500)
)  
BEGIN

	INSERT INTO 
		roles (
			id_role,
			name
		)
	VALUES (
		p_id_role,
    p_name
	)
	;
  
END$$