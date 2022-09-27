--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` VALUES ('ADD','Add new'),('DELETE','Remove'),('EDIT','Change'),('READ','Read');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` VALUES ('NORMAL_USER','Normal User'),('SUPER_ADMIN','Super Admin');


--
-- Dumping data for table `access_resources`
--
INSERT INTO `access_resources` VALUES 
('ADMIN_CONTROL_PANEL','Admin Control Panel'),

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
);