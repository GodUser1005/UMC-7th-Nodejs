CREATE TABLE `users` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`name`	varchar(20)	NOT NULL,
	`gender`	tinyint	NOT NULL,
	`birth`	datetime	NOT NULL,
	`e_mail`	varchar(100)	NULL,
	`phone_no`	varchar(11)	NULL,
	`address`	text	NULL,
	`point`	int	NOT NULL	DEFAULT 0,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`location_id`	bigint	NULL
);

CREATE TABLE `food_categories` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`name`	varchar(10)	NOT NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL
);

CREATE TABLE `missions` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`contents`	text	NOT NULL,
	`point`	int	NOT NULL	DEFAULT 0,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`expiration_date`	datetime	NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`store_id`	bigint	NOT NULL
);

CREATE TABLE `location` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`name`	varchar(7)	NOT NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL
);

CREATE TABLE `kind_food_categories` (
	`user_id`	bigint	NOT NULL ,
	`category_id`	bigint	NOT NULL ,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL
);

CREATE TABLE `stores` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`name`	varchar(30)	NULL,
	`address`	text	NOT NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`location_id`	bigint	NOT NULL,
	`category_id`	bigint	NOT NULL
);

CREATE TABLE `reviews` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`score`	tinyint	NOT NULL	DEFAULT 0,
	`content`	text	NULL,
	`reply`	text	NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL,
	`store_id`	bigint	NOT NULL
);

CREATE TABLE `user_mission` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL,
	`mission_id`	bigint	NOT NULL
);

CREATE TABLE `review_images` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`URL`	text	NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`review_id`	bigint	NOT NULL
);

CREATE TABLE `inqueries` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL
);

CREATE TABLE `inquery_images` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`URL`	text	NOT NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`inquery_id`	bigint	NOT NULL
);

CREATE TABLE `alerts` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`is_comfirmed`	boolean	NOT NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL
);

CREATE TABLE `review_alerts` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`alert_id`	bigint	NOT NULL
);

CREATE TABLE `inquery_alerts` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`alert_id`	bigint	NOT NULL
);

CREATE TABLE `mission_alerts` (
	`id`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`alert_id`	bigint	NOT NULL
);

ALTER TABLE `kind_food_categories` ADD CONSTRAINT `PK_KIND_FOOD_CATEGORIES` PRIMARY KEY(
	`user_id`,
	`category_id`
);

ALTER TABLE `users` ADD CONSTRAINT `FK_location_TO_users_1` FOREIGN KEY (
	`location_id`
)
REFERENCES `location` (
	`id`
);

ALTER TABLE `missions` ADD CONSTRAINT `FK_stores_TO_missions_1` FOREIGN KEY (
	`store_id`
)
REFERENCES `stores` (
	`id`
);

ALTER TABLE `kind_food_categories` ADD CONSTRAINT `FK_users_TO_kind_food_categories_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `kind_food_categories` ADD CONSTRAINT `FK_food_categories_TO_kind_food_categories_1` FOREIGN KEY (
	`category_id`
)
REFERENCES `food_categories` (
	`id`
);

ALTER TABLE `stores` ADD CONSTRAINT `FK_location_TO_stores_1` FOREIGN KEY (
	`location_id`
)
REFERENCES `location` (
	`id`
);

ALTER TABLE `stores` ADD CONSTRAINT `FK_food_categories_TO_stores_1` FOREIGN KEY (
	`category_id`
)
REFERENCES `food_categories` (
	`id`
);

ALTER TABLE `reviews` ADD CONSTRAINT `FK_users_TO_reviews_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `reviews` ADD CONSTRAINT `FK_stores_TO_reviews_1` FOREIGN KEY (
	`store_id`
)
REFERENCES `stores` (
	`id`
);

ALTER TABLE `user_mission` ADD CONSTRAINT `FK_users_TO_user_mission_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `user_mission` ADD CONSTRAINT `FK_missions_TO_user_mission_1` FOREIGN KEY (
	`mission_id`
)
REFERENCES `missions` (
	`id`
);

ALTER TABLE `review_images` ADD CONSTRAINT `FK_reviews_TO_review_images_1` FOREIGN KEY (
	`review_id`
)
REFERENCES `reviews` (
	`id`
);

ALTER TABLE `inqueries` ADD CONSTRAINT `FK_users_TO_inqueries_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `inquery_images` ADD CONSTRAINT `FK_inqueries_TO_inquery_images_1` FOREIGN KEY (
	`inquery_id`
)
REFERENCES `inqueries` (
	`id`
);

ALTER TABLE `alerts` ADD CONSTRAINT `FK_users_TO_alerts_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`id`
);

ALTER TABLE `review_alerts` ADD CONSTRAINT `FK_alerts_TO_review_alerts_1` FOREIGN KEY (
	`alert_id`
)
REFERENCES `alerts` (
	`id`
);

ALTER TABLE `inquery_alerts` ADD CONSTRAINT `FK_alerts_TO_inquery_alerts_1` FOREIGN KEY (
	`alert_id`
)
REFERENCES `alerts` (
	`id`
);

ALTER TABLE `mission_alerts` ADD CONSTRAINT `FK_alerts_TO_mission_alerts_1` FOREIGN KEY (
	`alert_id`
)
REFERENCES `alerts` (
	`id`
);

