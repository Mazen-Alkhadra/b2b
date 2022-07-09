DELIMITER $$
CREATE PROCEDURE `prc_update_role` (
	p_id_role   						VARCHAR(50),
	p_name	              	VARCHAR(500)
)  
BEGIN

  UPDATE 
    roles
  SET 
    name = IFNULL(p_name, name)
  WHERE 
    id_role = p_id_role
  ;
  
END$$