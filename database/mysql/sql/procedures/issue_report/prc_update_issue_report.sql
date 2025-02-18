DELIMITER $$
CREATE PROCEDURE `prc_update_issue_report` (
	p_id_issue_report			BIGINT UNSIGNED,
	p_public_email      	VARCHAR(500),  
	p_reporter_user_id		BIGINT UNSIGNED,
	p_content							LONGTEXT,
	p_status							VARCHAR(20)
)  
BEGIN

	UPDATE 
		issues_reports
	SET
		reporter_user_id = IFNULL(p_reporter_user_id, reporter_user_id),
		public_email = IFNULL(p_public_email, public_email),
		content = IFNULL(p_content, content),
		status = IFNULL(p_status, status)
	WHERE
		id_issue_report = p_id_issue_report
	;
  
END$$