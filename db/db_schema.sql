CREATE TABLE IF NOT EXISTS user_account (
   user_id  serial PRIMARY KEY,
   username varchar(32) NOT NULL,
   password varchar(64) NOT NULL,
   email varchar(64) NOT NULL,
   CONSTRAINT unique_username UNIQUE(username),
   CONSTRAINT unique_email UNIQUE(email)
);


CREATE TABLE IF NOT EXISTS message (
   message_id  serial PRIMARY KEY,
   body text NOT NULL,
   sender int NOT NULL REFERENCES user_account (user_id),
   recipient int NOT NULL REFERENCES user_account (user_id),
   created_at timestamp NOT NULL
);