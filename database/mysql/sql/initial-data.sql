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
