CREATE TABLE IF NOT EXISTS user_account (
   user_id  serial PRIMARY KEY,
   username varchar(32) NOT NULL,
   password varchar(64) NOT NULL,
   email varchar(64) NOT NULL,
   CONSTRAINT unique_username UNIQUE(username),
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
   created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS dialog_contact (
   dialog_id int NOT NULL REFERENCES dialog (dialog_id),
   user_id int NOT NULL REFERENCES user_account (user_id)
);

CREATE TABLE IF NOT EXISTS contact_list (
   user_id int NOT NULL REFERENCES user_account (user_id),
   contact_id int NOT NULL REFERENCES user_account (user_id)
);