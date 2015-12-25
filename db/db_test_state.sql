-- DROP
DROP SCHEMA PUBLIC CASCADE;
CREATE SCHEMA PUBLIC;

CREATE EXTENSION pgcrypto
  SCHEMA public
  VERSION "1.0";

-- SCHEMA
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

-- DATA
INSERT INTO users (email, password) VALUES ('admin@mail.com', crypt('admin', gen_salt('bf')));

INSERT INTO users (email, password) VALUES ('test@mail.com', crypt('test', gen_salt('bf')));

INSERT INTO user_status (user_id, status) VALUES (1, 'offline');

INSERT INTO user_status (user_id, status) VALUES (2, 'offline');

INSERT INTO profile VALUES (1, 'Admin', 'avatar_user_1', '0989999999');

INSERT INTO profile VALUES (2, 'Test', 'avatar_user_2.jpg', '0967777777');

INSERT INTO roster (user_id) VALUES (1);

INSERT INTO roster (user_id) VALUES (2);

INSERT INTO roster_users VALUES (1, 2);

INSERT INTO roster_users VALUES (2, 1);

INSERT INTO room (name) VALUES ('Admin, Test');

INSERT INTO room_users VALUES (1, 1);

INSERT INTO room_users VALUES (1, 2);

INSERT INTO message (body, sender, room_id, created_at) VALUES ('How are you?', 1, 1, to_timestamp(1448209952));

INSERT INTO message (body, sender, room_id, created_at) VALUES ('I am fine)', 2, 1, to_timestamp(1448287443));

-- TEST 2

INSERT INTO users (email, password) VALUES ('test2@mail.com', crypt('test2', gen_salt('bf')));

INSERT INTO user_status (user_id, status) VALUES (3, 'offline');

INSERT INTO profile VALUES (3, 'Test2', 'avatar_user_3.jpg', '0967777777');

INSERT INTO roster (user_id) VALUES (3);

INSERT INTO roster_users VALUES (3, 1);

INSERT INTO roster_users VALUES (1, 3);

INSERT INTO room (name) VALUES ('Admin, Test2');

INSERT INTO room_users VALUES (2, 1);

INSERT INTO room_users VALUES (2, 3);

INSERT INTO message (body, sender, room_id, created_at) VALUES ('How are you?', 3, 2, to_timestamp(1448209952));

INSERT INTO message (body, sender, room_id, created_at) VALUES ('I am fine)', 1, 2, to_timestamp(1448287343));