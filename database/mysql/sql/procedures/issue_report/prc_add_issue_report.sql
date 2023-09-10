DELIMITER $$
CREATE PROCEDURE `prc_add_issue_report` (
	p_reporter_user_id		BIGINT UNSIGNED,
	p_public_email        VARCHAR(500),
	p_content							LONGTEXT,
	p_status							VARCHAR(20),
	OUT p_out_new_rec_id	BIGINT UNSIGNED
)  
BEGIN

	INSERT INTO 
		issues_reports (
			reporter_user_id,
			public_email,
			content,
			status
		)
	VALUES (
		p_reporter_user_id,
		p_public_email,
		p_content,
		IFNULL(p_status, DEFAULT(status))
	)
	;
  
	SET p_out_new_rec_id = LAST_INSERT_ID();
	SELECT p_out_new_rec_id AS newRecId;

END$$