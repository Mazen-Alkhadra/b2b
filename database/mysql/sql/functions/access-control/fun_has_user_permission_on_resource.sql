DELIMITER $$
CREATE FUNCTION `fun_has_user_permission_on_resource` (
  p_user_id          BIGINT UNSIGNED,
  p_permission_id    VARCHAR(50),
  p_resource_id      VARCHAR(50)
)
RETURNS BOOLEAN
BEGIN
  
  DECLARE v_user_role_id VARCHAR(50) DEFAULT (
    SELECT role_id FROM users WHERE id_user = p_user_id
  );

  RETURN EXISTS (
    SELECT 
      role_id 
    FROM 
      roles_resources_permissions
    WHERE 
      role_id = v_user_role_id AND 
      resource_id = p_resource_id AND 
      permission_id = p_permission_id
  );

END$$