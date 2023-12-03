CREATE EVENT `ev_check_tenders_status` 
ON SCHEDULE EVERY 10 MINUTE 
ENABLE DO 
  CALL prc_check_coming_tenders();