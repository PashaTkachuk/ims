CREATE TABLE IF NOT EXISTS "user" (
   user_id  serial PRIMARY KEY,
   username varchar(32) NOT NULL,
   password varchar(64) NOT NULL,
   CONSTRAINT unique_username UNIQUE(username)
);


CREATE TABLE IF NOT EXISTS "message" (
   message_id  serial PRIMARY KEY,
   body text NOT NULL,
   sender int NOT NULL REFERENCES "user" (user_id),
   recipient int NOT NULL REFERENCES "user" (user_id),
   created_at timestamp NOT NULL
);