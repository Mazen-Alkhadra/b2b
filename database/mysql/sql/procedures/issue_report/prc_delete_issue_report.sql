DELIMITER $$
CREATE PROCEDURE `prc_delete_issue_report` (
	p_id_issue_report		BIGINT UNSIGNED
)  
BEGIN

	DELETE FROM 
		issues_reports
	WHERE
		id_issue_report = p_id_issue_report
	;
  
END$$