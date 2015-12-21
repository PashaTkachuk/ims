CREATE TABLE IF NOT EXISTS users (
   user_id serial PRIMARY KEY,
   email varchar(64) NOT NULL,
   password text NOT NULL,
   CONSTRAINT unique_email UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS user_status (
   status_id serial PRIMARY KEY,
   user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
   status varchar(32) DEFAULT 'offline'
);

CREATE TABLE IF NOT EXISTS profile (
   user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
   name varchar(128) DEFAULT NULL,
   avatar varchar(128) DEFAULT 'default_avatar.jpg',
   phone varchar(32) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_roster (
   roster_id serial PRIMARY KEY,
   user_id int NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS roster (
   roster_id int NOT NULL REFERENCES user_roster ON DELETE CASCADE,
   contact_id int NOT NULL REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS room (
   room_id serial PRIMARY KEY,
   name varchar(128) DEFAULT NULL,
   owner_id int REFERENCES users ON DELETE NO ACTION,
   last_message_id int DEFAULT NULL,
   last_updated_at timestamp DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS room_users (
   room_id int NOT NULL REFERENCES room,
   user_id int REFERENCES users ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS message (
   message_id  serial PRIMARY KEY,
   body text NOT NULL,
   sender int NOT NULL REFERENCES users ON DELETE SET NULL,
   room_id int NOT NULL REFERENCES room ON DELETE CASCADE,
   created_at timestamp NOT NULL,
   readed smallint DEFAULT 0
);