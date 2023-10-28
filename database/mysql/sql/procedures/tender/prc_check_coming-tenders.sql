DELIMITER $$
CREATE PROCEDURE `prc_check_coming_tenders` ()  
BEGIN

	UPDATE 
		tenders
	SET 
		status = 'OPENED'
	WHERE 
		status = 'COMING_SOON' AND 
		`from` < CURRENT_TIMESTAMP() 
  ;

END$$