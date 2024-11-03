CREATE TABLE `users` (
	`id`	bigint	NOT NULL,
	`name`	varchar(20)	NOT NULL,
	`gender`	tinyint	NOT NULL,
	`birth`	datetime	NOT NULL,
	`e_mail`	varchar(100)	NULL,
	`phone_no`	varchar(11)	NULL,
	`address`	text	NULL,
	`point`	int	NOT NULL	DEFAULT 0,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`location_id`	bigint	NULL
);

CREATE TABLE `food_categories` (
	`id`	bigint	NOT NULL,
	`name`	varchar(10)	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL
);

CREATE TABLE `missions` (
	`id`	bigint	NOT NULL,
	`contents`	text	NOT NULL,
	`point`	int	NOT NULL	DEFAULT 0,
	`created_at`	datetime(6)	NOT NULL,
	`expiration_date`	datetime	NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`store_id`	bigint	NOT NULL
);

CREATE TABLE `location` (
	`id`	bigint	NOT NULL,
	`name`	varchar(7)	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL
);

CREATE TABLE `kind_food_categories` (
	`user_id`	bigint	NOT NULL,
	`category_id`	bigint	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL
);

CREATE TABLE `stores` (
	`id`	bigint	NOT NULL,
	`name`	varchar(30)	NULL,
	`address`	text	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`location_id`	bigint	NOT NULL,
	`category_id`	bigint	NOT NULL
);

CREATE TABLE `reviews` (
	`id`	bigint	NOT NULL,
	`score`	tinyint	NOT NULL	DEFAULT 0,
	`content`	text	NULL,
	`reply`	text	NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL,
	`store_id`	bigint	NOT NULL
);

CREATE TABLE `user_mission` (
	`id`	bigint	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL,
	`mission_id`	bigint	NOT NULL
);

CREATE TABLE `review_images` (
	`id`	bigint	NOT NULL,
	`URL`	text	NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`review_id`	bigint	NOT NULL
);

CREATE TABLE `inqueries` (
	`id`	bigint	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL
);

CREATE TABLE `inquery_images` (
	`id`	bigint	NOT NULL,
	`URL`	text	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`inquery_id`	bigint	NOT NULL
);

CREATE TABLE `alerts` (
	`id`	bigint	NOT NULL,
	`is_comfirmed`	boolean	NOT NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`user_id`	bigint	NOT NULL
);

CREATE TABLE `review_alerts` (
	`id`	bigint	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`alert_id`	bigint	NOT NULL
);

CREATE TABLE `inquery_alerts` (
	`id`	bigint	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`alert_id`	bigint	NOT NULL
);

CREATE TABLE `mission_alerts` (
	`id`	bigint	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`created_at`	datetime(6)	NOT NULL,
	`updated_at`	datetime(6)	NULL,
	`status`	tinyint	NULL,
	`alert_id`	bigint	NOT NULL
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `food_categories` ADD CONSTRAINT `PK_FOOD_CATEGORIES` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `missions` ADD CONSTRAINT `PK_MISSIONS` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `location` ADD CONSTRAINT `PK_LOCATION` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `kind_food_categories` ADD CONSTRAINT `PK_KIND_FOOD_CATEGORIES` PRIMARY KEY AUTO_INCREMENT (
	`user_id`,
	`category_id`
);

ALTER TABLE `stores` ADD CONSTRAINT `PK_STORES` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `reviews` ADD CONSTRAINT `PK_REVIEWS` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `user_mission` ADD CONSTRAINT `PK_USER_MISSION` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `review_images` ADD CONSTRAINT `PK_REVIEW_IMAGES` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `inqueries` ADD CONSTRAINT `PK_INQUERIES` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `inquery_images` ADD CONSTRAINT `PK_INQUERY_IMAGES` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `alerts` ADD CONSTRAINT `PK_ALERTS` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `review_alerts` ADD CONSTRAINT `PK_REVIEW_ALERTS` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `inquery_alerts` ADD CONSTRAINT `PK_INQUERY_ALERTS` PRIMARY KEY AUTO_INCREMENT (
	`id`
);

ALTER TABLE `mission_alerts` ADD CONSTRAINT `PK_MISSION_ALERTS` PRIMARY KEY AUTO_INCREMENT (
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

