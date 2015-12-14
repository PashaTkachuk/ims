CREATE TABLE IF NOT EXISTS user_account (
   user_id  serial PRIMARY KEY,
   email varchar(64) NOT NULL,
   password varchar(64) NOT NULL,
   name varchar(128) DEFAULT NULL,
   avatar varchar(128) DEFAULT 'default_avatar.jpg',
   phone varchar(32) DEFAULT NULL,
   status varchar(32) DEFAULT NULL,
   CONSTRAINT unique_email UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS dialog (
   dialog_id  serial PRIMARY KEY,
   name varchar(32) DEFAULT NULL,
   type varchar(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS message (
   message_id  serial PRIMARY KEY,
   body text NOT NULL,
   sender int NOT NULL REFERENCES user_account (user_id),
   dialog int NOT NULL REFERENCES dialog (dialog_id),
   created_at timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS dialog_contact (
   dialog_id int NOT NULL REFERENCES dialog (dialog_id),
   user_id int NOT NULL REFERENCES user_account (user_id)
);

CREATE TABLE IF NOT EXISTS contact_list (
   user_id int NOT NULL REFERENCES user_account (user_id),
   contact_id int NOT NULL REFERENCES user_account (user_id),
   dialog_id int DEFAULT NULL REFERENCES dialog (dialog_id)
);