--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` VALUES 
('ADD','Add new'),
('DELETE','Remove'),
('EDIT','Change'),
('READ','Read'),
('EXPORT','Export');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` VALUES ('NORMAL_USER','Normal User'),('SUPER_ADMIN','Super Admin');


--
-- Dumping data for table `access_resources`
--
INSERT INTO `access_resources` VALUES 
('ADMIN_CONTROL_PANEL','Admin Control Panel'),
('REPORTS', 'Reports'),
('SETTINGS', 'Settings'),
('SERVICES', 'Services'),
('SUBSCRIPTIONS', 'subscriptions'),
('AC', 'Access Control'),
('HR', 'HR')

--
-- Dumping data for table `roles_resources_permissions`
--

INSERT INTO `roles_resources_permissions` VALUES 
  ('SUPER_ADMIN','ADMINS_CONTROL_PANEL','READ')
;


--
-- Dumping data for table `users`
--
--  admin@12345
INSERT INTO `users` VALUES (
1,
'admin',
'admin',
'admin@b2b.com',
NULL,
'$2b$04$4xkI/yTbQ1.a4tOqL00sYevDgn1Hf6TdkNJl4au1Nn/mNSYQv1oWK',
NULL,NULL,NULL, NULL, 'SUPER_ADMIN', FALSE, TRUE, current_timestamp());


INSERT INTO subscription_features (
  id_subscription_feature, 
  name_str_id,
  description_str_id
) VALUES 
(
 'TENDERS_PER_MONTH',
 fun_add_string('en', 'Tenders Per Month'),
 fun_add_string('en', 'Tenders Count That Users Can Create Per Month')
),
(
 'TENDERS_PER_DAY',
 fun_add_string('en', 'Tenders Per Day'),
 fun_add_string('en', 'Tenders Count That Users Can Create Per Day')
),
(
 'ACCEPT_OFFERS_COUNT',
 fun_add_string('en', 'Accepted Offers Count'),
 fun_add_string('en', 'Offers Count That Users Can Accept')
);
-- =====================================================================
INSERT INTO settings (
  id_setting, 
  name_str_id,
  value
) VALUES 
(
 'MAX_TENDER_DURATION_SEC',
 fun_add_string('en', 'Max Tender Duration In Seconds'),
 604800
),
(
 'MAX_ACCEPT_OFFER_TIME_SEC',
 fun_add_string('en', 'Max Time For Accept Offer In Seconds'),
 604800
);