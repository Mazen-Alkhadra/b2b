DELIMITER $$
CREATE PROCEDURE `prc_add_setting` (
	p_id_setting            VARCHAR(100),                    
	p_name_str_id						BIGINT UNSIGNED,
	p_value                 LONGTEXT
)  
BEGIN

	INSERT INTO 
		settings (
			id_setting,
			name_str_id,
			value
		)
	VALUES (
		p_id_setting,
		p_name_str_id,
		p_value
	)
	;
	
END$$