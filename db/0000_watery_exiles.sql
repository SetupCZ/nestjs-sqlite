CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`create_timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`update_timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
