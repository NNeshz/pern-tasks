CREATE TABLE IF NOT EXISTS `tasks` (
    `id` SERIAL PRIMARY KEY,
    `title` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
)