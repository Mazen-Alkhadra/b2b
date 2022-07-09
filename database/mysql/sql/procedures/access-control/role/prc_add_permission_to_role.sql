DELIMITER $$
CREATE PROCEDURE `prc_add_permission_to_role` (
	p_id_role   						VARCHAR(50),
	p_resource_id           VARCHAR(50),
  p_permission_id         VARCHAR(50)
)  
BEGIN

	INSERT INTO 
		roles_resources_permissions (
			role_id,
			resource_id,
      permission_id
		)
	VALUES (
		p_id_role,
    p_resource_id,
    p_permission_id
	)
	;
  
END$$