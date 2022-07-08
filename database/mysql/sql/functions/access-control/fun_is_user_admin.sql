DELIMITER $$
CREATE FUNCTION `fun_is_user_admin` (
  p_user_id          BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  
  RETURN fun_has_user_permission_on_resource (
    p_user_id,
    fun_get_permission_id_from_type('READ'),
    'ADMIN_CONTROL_PANEL'
  );

END$$