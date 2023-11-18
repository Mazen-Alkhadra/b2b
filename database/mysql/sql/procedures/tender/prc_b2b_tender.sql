DELIMITER $$
CREATE PROCEDURE `prc_b2b_tender` (
	p_id_tender					BIGINT UNSIGNED
)  
BEGIN

  DECLARE v_tender_user_id BIGINT UNSIGNED DEFAULT (
    SELECT creat_by_user_id FROM tenders WHERE id_tender = p_id_tender
  );

  CALL prc_update_tender (
    p_id_tender, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
    NULL, NULL, NULL, 'B2B', NULL, CURRENT_TIMESTAMP() 
  );

  CALL prc_update_user (
    v_tender_user_id, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    NULL, NULL, NULL, NULL, fun_get_user_b2b_count(v_tender_user_id),
    NULL
  );	

  UPDATE 
    users
  SET 
    score = fun_get_user_b2b_count(id_user)
  WHERE 
    id_user IN (
      SELECT creat_by_user_id FROM offers WHERE tender_id = p_id_tender
    )
  ;

END$$