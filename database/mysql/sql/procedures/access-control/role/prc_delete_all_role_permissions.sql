DELIMITER $$
CREATE PROCEDURE `prc_delete_all_role_permissions` (
	p_name	              	VARCHAR(500)
)  
BEGIN

  DELETE FROM  
    roles_resources_permissions
  WHERE 
    role_id = p_id_role
  ;
  
END$$