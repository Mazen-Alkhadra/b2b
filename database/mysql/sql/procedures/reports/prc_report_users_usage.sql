DELIMITER $$
CREATE PROCEDURE `prc_report_users_usage` ()  
BEGIN

  SELECT
    id_user	idUser,
		first_name	firstName,
		last_name	lastName,
		email	email,
		mobile	mobile,
		company_id	companyId,
    is_active isActive,
    fun_get_user_tender_count(id_user, 1) todayTendersCnt,
    fun_get_user_tender_count(id_user, 30) thisMonthTendersCnt,
    fun_get_user_subscribe_feature_val(NULL, id_user, 'TENDERS_PER_MONTH', NULL) subscribeMonthlyTendersCnt,
    fun_get_user_subscribe_feature_val(NULL, id_user, 'TENDERS_PER_DAY', NULL) subscribeDailyTendersCnt
  FROM
    users
  WHERE 
    !fun_is_user_admin(id_user) AND 
    is_accepted = TRUE
  ;

END$$