CREATE TABLE IF NOT EXISTS users (
   user_id serial PRIMARY KEY,
   email varchar(64) NOT NULL,
   password text NOT NULL,
   CONSTRAINT unique_email UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS user_status (
   user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
   status varchar(32) DEFAULT 'offline'
);

CREATE TABLE IF NOT EXISTS profile (
   user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
   name varchar(128) DEFAULT NULL,
   avatar varchar(128) DEFAULT 'default_avatar.jpg',
   phone varchar(32) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS roster (
   roster_id serial PRIMARY KEY,
   user_id int NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS roster_users (
   roster_id int NOT NULL REFERENCES roster ON DELETE CASCADE,
   contact_id int NOT NULL REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS room (
   room_id serial PRIMARY KEY,
   name varchar(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS room_users (
   room_id int NOT NULL REFERENCES room ON DELETE CASCADE,
   user_id int REFERENCES users ON DELETE CASCADE,
   CONSTRAINT room_user PRIMARY KEY(room_id,user_id)
);

CREATE TABLE IF NOT EXISTS message (
   message_id  serial PRIMARY KEY,
   body text NOT NULL,
   sender int NOT NULL REFERENCES users ON DELETE SET NULL,
   room_id int NOT NULL REFERENCES room ON DELETE CASCADE,
   created_at timestamptz NOT NULL,
   readed smallint DEFAULT 0
);

CREATE TABLE IF NOT EXISTS token (
   email varchar(64) NOT NULL,
   token varchar(128) NOT NULL,
   CONSTRAINT token_unique_email UNIQUE(email)
);