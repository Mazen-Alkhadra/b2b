-- -----------------------------------------------------
-- Table `strings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strings` (
 `id_str`   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `en`       LONGTEXT NULL DEFAULT NULL,
 `ar`       LONGTEXT NULL DEFAULT NULL,
  
  PRIMARY KEY (`id_str`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table imgs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imgs` (
  `id_img`		        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `url`	              VARCHAR(500) NOT NULL,
 
  PRIMARY KEY (`id_img`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table docs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `docs` (
  `id_doc`		        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `url`	              VARCHAR(500) NOT NULL,
 
  PRIMARY KEY (`id_doc`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ===================================================================================

-- -----------------------------------------------------
-- Table `logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logs` (
  `id_log`                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `log_text`               LONGTEXT NOT NULL,
  `log_level`              VARCHAR(50) NOT NULL,
  `creat_at`               DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
     
  PRIMARY KEY (`id_log`)
  
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ===================================================================================
-- -----------------------------------------------------
-- Table roles
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role`		    VARCHAR(50)  NOT NULL,
  `name`	        VARCHAR(500) NOT NULL,
  
  PRIMARY KEY (`id_role`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table permissions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `permissions` (
  `id_permission`	VARCHAR(50)  NOT NULL,
  `name`	        VARCHAR(500) NOT NULL,
   
  PRIMARY KEY (`id_permission`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table access_resources
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access_resources` (
  `id_resource`  	VARCHAR(50)  NOT NULL,
  `name`	        VARCHAR(500) NOT NULL,

  PRIMARY KEY (`id_resource`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table roles_resources_permissions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles_resources_permissions` (
  `role_id`  	      VARCHAR(50)  NOT NULL,
  `resource_id`  	  VARCHAR(50)  NOT NULL,
  `permission_id`  	VARCHAR(50)  NOT NULL,

  CONSTRAINT `unique_rrp` 
    UNIQUE (`role_id`, `resource_id`, `permission_id`),
  CONSTRAINT `fk_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `roles` (`id_role`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_resources`
    FOREIGN KEY (`resource_id`)
    REFERENCES `access_resources` (`id_resource`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_permissions`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permissions` (`id_permission`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `companies` (
  `id_company`			  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_str_id` 				  BIGINT UNSIGNED NOT NULL,
  `type`                  VARCHAR(100) NULL,    
  `address`               LONGTEXT NULL,
  `license_number`        LONGTEXT NULL,
  `establish_at`          DATETIME NULL,
  `license_img_id`        BIGINT UNSIGNED NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_company`),
  
  CONSTRAINT `fk_company_name`
    FOREIGN KEY (`name_str_id` )
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_company_license_img`
    FOREIGN KEY (`license_img_id`)
    REFERENCES `imgs` (`id_img`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` 				  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` 					  VARCHAR(50) NULL,
  `last_name`						  VARCHAR(50) NULL, 
  `email`                 VARCHAR(100) NULL UNIQUE,    
  `mobile`                VARCHAR(100) NULL UNIQUE,
  `password` 						  VARCHAR(100) NULL,              
  `company_id`            BIGINT UNSIGNED NULL,
  `birth_date` 					  BIGINT UNSIGNED NULL DEFAULT NULL,
  `gender` 							  ENUM('Male', 'Female') NULL DEFAULT NULL,
  `img_id`                BIGINT UNSIGNED NULL DEFAULT NULL,
  `role_id`               VARCHAR(50) NOT NULL DEFAULT 'NORMAL_USER',
  `is_blocked`            BOOLEAN NOT NULL DEFAULT FALSE,
  `is_active`             BOOLEAN NOT NULL DEFAULT FALSE,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_user`),
  
  CONSTRAINT `fk_users_imgs`
    FOREIGN KEY (`img_id` )
    REFERENCES `imgs` (`id_img` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`role_id` )
    REFERENCES `roles` (`id_role` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_company`
    FOREIGN KEY (`company_id` )
    REFERENCES `companies` (`id_company` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `users_codes` -- activation codes, reset password, etc
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users_codes` (
  `id_code`     		  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` 				  	  BIGINT UNSIGNED NOT NULL,
  `code`          				VARCHAR(190) NOT NULL UNIQUE,
  `type`                  ENUM('ACTIVATE', 'RESET_PASS') NOT NULL,
  `is_active`             BOOLEAN NOT NULL DEFAULT TRUE,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date_time`      BIGINT UNSIGNED NULL DEFAULT NULL,


  PRIMARY KEY (`id_code`) ,
  
  CONSTRAINT `fk_user_of_code`
    FOREIGN KEY (`user_id` )
    REFERENCES `users` (`id_user` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id_category`			  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_str_id` 				  BIGINT UNSIGNED NOT NULL,
  `description_str_id`	  BIGINT UNSIGNED NULL,
  `type`                  ENUM('PRODUCTS') NOT NULL DEFAULT 'PRODUCTS',    
  `added_by_user_id`      BIGINT UNSIGNED NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_category`),
  
  CONSTRAINT `fk_category_name`
    FOREIGN KEY (`name_str_id` )
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_category_user`
    FOREIGN KEY (`added_by_user_id`)
    REFERENCES `users` (`id_user`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_category_description`
    FOREIGN KEY (`description_str_id`)
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `brands` (
  `id_brand`  			  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_str_id` 				  BIGINT UNSIGNED NOT NULL,
  `description_str_id`	  BIGINT UNSIGNED NULL,
  `category_id`           BIGINT UNSIGNED NOT NULL,    
  `added_by_user_id`      BIGINT UNSIGNED NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_brand`),
  
  CONSTRAINT `fk_brand_name`
    FOREIGN KEY (`name_str_id` )
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_brand_user`
    FOREIGN KEY (`added_by_user_id`)
    REFERENCES `users` (`id_user`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_brand_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id_category`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_brand_description`
    FOREIGN KEY (`description_str_id`)
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id_product`  		  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_str_id` 				  BIGINT UNSIGNED NOT NULL,
  `description_str_id`	  BIGINT UNSIGNED NULL,
  `brand_id`              BIGINT UNSIGNED NOT NULL,
  `added_by_user_id`      BIGINT UNSIGNED NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_product`),
  
  CONSTRAINT `fk_product_name`
    FOREIGN KEY (`name_str_id` )
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_description`
    FOREIGN KEY (`description_str_id`)
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `brands` (`id_brand`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `users_cares`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users_cares` (
  `user_id`               BIGINT UNSIGNED NOT NULL,
  `category_id`           BIGINT UNSIGNED NULL,
  `brand_id`              BIGINT UNSIGNED NULL,
  `product_id`            BIGINT UNSIGNED NULL,
  
  CONSTRAINT `fk_user_of_care`
    FOREIGN KEY (`user_id` )
    REFERENCES `users` (`id_user` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_category_of_care`
    FOREIGN KEY (`category_id` )
    REFERENCES `categories` (`id_category` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_brand_of_care`
    FOREIGN KEY (`brand_id` )
    REFERENCES `brands` (`id_brand` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_of_care`
    FOREIGN KEY (`product_id` )
    REFERENCES `products` (`id_product`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `tenders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tenders` (
  `id_tender`   		  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`                  LONGTEXT,
  `product_id`  				  BIGINT UNSIGNED NOT NULL,
  `quantity`           	  DOUBLE NOT NULL,
  `from`                  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `to`                    DATETIME NOT NULL,
  `delivery_address`      LONGTEXT NULL,   
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closed_at`             DATETIME NULL,

  PRIMARY KEY (`id_tender`),
  
  CONSTRAINT `fk_tender_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id_product`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `offers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `offers` (
  `id_offer`    		  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tender_id`    				  BIGINT UNSIGNED NOT NULL,
  `price_USD`         	  DOUBLE NOT NULL,
  `b_include_delivery`    BOOLEAN,
  `delivery_cost`         DOUBLE,
  `delivery_address`      LONGTEXT NULL,
  `status`                ENUM('PENDING', 'REJECTED', 'EXECUTING_PENDING', 'EXECUTED') NOT NULL DEFAULT 'PENDING',
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted_at`           DATETIME NULL,
  `excuted_at`            DATETIME NULL,
  
  PRIMARY KEY (`id_offer`),
  
  CONSTRAINT `fk_offer_tender`
    FOREIGN KEY (`tender_id`)
    REFERENCES `tenders` (`id_tender`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `subscription_features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscription_features` (
  `id_subscription_feature`   VARCHAR(50) NOT NULL,
  `name_str_id`	              BIGINT UNSIGNED NOT NULL,
  `description_str_id`	      BIGINT UNSIGNED NULL,
 
  PRIMARY KEY (`id_subscription_feature`),

  CONSTRAINT `fk_subscribe_feature_name`
    FOREIGN KEY (`name_str_id` )
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_subscribe_feature_desc`
    FOREIGN KEY (`description_str_id` )
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `subscription_packages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscription_packages` (
  `id_subscription_package`   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_str_id`	              BIGINT UNSIGNED NOT NULL,
  `description_str_id`	      BIGINT UNSIGNED NULL,
  `price_usd`                 DOUBLE NOT NULL DEFAULT 0,
  `img_id`                    BIGINT UNSIGNED NULL,
  `expir_at`                  DATETIME NULL DEFAULT NULL,
  `validity_seconds`          BIGINT UNSIGNED NULL DEFAULT NULL,  
  `is_active`                 BOOLEAN NOT NULL DEFAULT FALSE,
  `creat_at`                  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 
  PRIMARY KEY (`id_subscription_package`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `promotions` (
  `id_promotion`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code`                  VARCHAR(190) NOT NULL UNIQUE,
  `description_str_id`    BIGINT UNSIGNED NOT NULL,
  `type`                  ENUM('ONE_TIME', 'PERIOD_BASED') NOT NULL DEFAULT 'ONE_TIME',
  `start_at`              DATETIME NULL,
  `end_at`                DATETIME NULL,
  `discount_usd`          DOUBLE NULL DEFAULT NULL,
  `is_active`             BOOLEAN NOT NULL DEFAULT FALSE,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 
  PRIMARY KEY (`id_promotion`),

  CONSTRAINT `fk_promotion_desc`
    FOREIGN KEY (`description_str_id` )
    REFERENCES `strings` (`id_str`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `subscription_packages_features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscription_packages_features` (
  `subscription_package_id`    BIGINT UNSIGNED NOT NULL,
  `subscription_feature_id`    VARCHAR(50) NOT NULL,
  `feature_value`              DOUBLE NOT NULL DEFAULT 1,
 
  CONSTRAINT `fk_subscribe_package_of_feature`
    FOREIGN KEY (`subscription_package_id` )
    REFERENCES `subscription_packages` (`id_subscription_package`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_subscribe_feature_in_package`
    FOREIGN KEY (`subscription_feature_id` )
    REFERENCES `subscription_features` (`id_subscription_feature` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `payments` (
  `id_payment`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`                BIGINT UNSIGNED NOT NULL,
  `type`                   ENUM('CASH') NOT NULL DEFAULT 'CASH',
  `amount_usd`             DOUBLE NOT NULL,
  `comment`   	           VARCHAR(500) NULL,
  `status`                 ENUM('INIT', 'PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'INIT',
  `creat_at`               DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `complete_at`            DATETIME NULL DEFAULT NULL,
                   
  PRIMARY KEY (`id_payment`),

  CONSTRAINT `fk_user_of_payment`
    FOREIGN KEY (`user_id` )
    REFERENCES `users` (`id_user` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `subscriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id_subscription`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`                 BIGINT UNSIGNED NOT NULL,
  `subscription_package_id` BIGINT UNSIGNED NOT NULL,
  `payment_id`              BIGINT UNSIGNED NOT NULL,
  `promotion_id`            BIGINT UNSIGNED NULL DEFAULT NULL,
  `expir_at`                DATETIME NULL DEFAULT NULL,
  `actual_cost_usd`         DOUBLE NOT NULL,
  `is_active`               BOOLEAN NOT NULL DEFAULT FALSE,
  `subscrib_at`             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   
  PRIMARY KEY (`id_subscription`),

  CONSTRAINT `fk_subscribe_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `users` (`id_user` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_subscribe_package`
    FOREIGN KEY (`subscription_package_id` )
    REFERENCES `subscription_packages` (`id_subscription_package` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_subscribe_payment`
    FOREIGN KEY (`payment_id` )
    REFERENCES `payments` (`id_payment` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_subscribe_promotion`
    FOREIGN KEY (`promotion_id`)
    REFERENCES `promotions` (`id_promotion` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `issues_reports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issues_reports` (
  `id_issue_report`        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reporter_user_id`       BIGINT UNSIGNED NOT NULL,
  `content`                LONGTEXT NULL,
  `status`                 ENUM('NEW', 'REJECTED', 'RESOLVED') NOT NULL DEFAULT 'NEW',
  `create_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       
  PRIMARY KEY (`id_issue_report`),

  CONSTRAINT `FK_issue_reporter`
    FOREIGN KEY (`reporter_user_id`)
    REFERENCES `users` (`id_user` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `faqs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faqs` (
  `id_faq`                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_str_id`        BIGINT UNSIGNED NOT NULL,
  `answer_str_id`          BIGINT UNSIGNED NOT NULL,
  `is_active`              BOOLEAN NOT NULL DEFAULT FALSE,
  `create_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       
  PRIMARY KEY (`id_faq`),

  CONSTRAINT `FK_faq_question_str`
    FOREIGN KEY (`question_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_faq_answer_str`
    FOREIGN KEY (`answer_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `about_us`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `about_us` (
  `id_about_us`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_info_str_id`    BIGINT UNSIGNED NULL,
  `who_are_we_str_id`      BIGINT UNSIGNED NULL,
  `view_str_id`            BIGINT UNSIGNED NULL,
  `target_str_id`          BIGINT UNSIGNED NULL,
  `other_info_str_id`      BIGINT UNSIGNED NULL,
  `is_active`              BOOLEAN NOT NULL DEFAULT FALSE,
  `create_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       
  PRIMARY KEY (`id_about_us`),

  CONSTRAINT `FK_company_info_str`
    FOREIGN KEY (`company_info_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_who_are_we_str`
    FOREIGN KEY (`who_are_we_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_target_str`
    FOREIGN KEY (`target_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_view_str`
    FOREIGN KEY (`view_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_other_info_str`
    FOREIGN KEY (`other_info_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `privacy_policy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `privacy_policy` (
  `id_privacy_policy`      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_str_id`         BIGINT UNSIGNED NOT NULL,
  `is_active`              BOOLEAN NOT NULL DEFAULT FALSE,
  `create_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       
  PRIMARY KEY (`id_privacy_policy`),

  CONSTRAINT `FK_privacy_content__str`
    FOREIGN KEY (`content_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `terms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `terms` (
  `id_term`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_str_id`         BIGINT UNSIGNED NOT NULL,
  `is_active`              BOOLEAN NOT NULL DEFAULT FALSE,
  `create_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       
  PRIMARY KEY (`id_term`),

  CONSTRAINT `FK_term_content_str`
    FOREIGN KEY (`content_str_id`)
    REFERENCES `strings` (`id_str` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `contact_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_info` (
  `id_contact_info`        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address`                LONGTEXT NULL,
  `mobile`                 VARCHAR(100) NULL,
  `phone`                  VARCHAR(100) NULL,
  `email`                  VARCHAR(100) NULL,
  `more_info`              LONGTEXT NULL, 
  `is_active`              BOOLEAN NOT NULL DEFAULT FALSE,
  `create_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       
  PRIMARY KEY (`id_contact_info`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
