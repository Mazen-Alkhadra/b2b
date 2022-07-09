DELIMITER $$
CREATE PROCEDURE `prc_delete_role` (
	p_id_role   						VARCHAR(50)
)  
BEGIN

  CALL prc_delete_all_role_permissions(p_id_role);
  
  DELETE FROM  
    roles
  WHERE 
    id_role = p_id_role
  ;
  
END$$