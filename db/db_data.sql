INSERT INTO users (email, password) VALUES ('admin@mail.com', crypt('admin', gen_salt('bf')));

INSERT INTO users (email, password) VALUES ('test@mail.com', crypt('test', gen_salt('bf')));

INSERT INTO user_status (status) VALUES ('offline');

INSERT INTO user_status (status) VALUES ('offline');

INSERT INTO profile VALUES (1, 'Admin', 'avatar_user_1', '0989999999', 1);

INSERT INTO profile VALUES (2, 'Test', 'avatar_user_2.jpg', '0967777777', 2);

INSERT INTO user_roster (user_id) VALUES (1);

INSERT INTO user_roster (user_id) VALUES (2);

INSERT INTO roster VALUES (1, 2);

INSERT INTO roster VALUES (2, 1);

INSERT INTO room (name, last_message_id, last_updated_at) VALUES ('Admin chat', 2, to_timestamp(1448287343));

INSERT INTO room_users VALUES (1, 1);

INSERT INTO room_users VALUES (1, 2);

INSERT INTO message (body, sender, room_id, created_at) VALUES ('How are you?', 1, 1, to_timestamp(1448209952));

INSERT INTO message (body, sender, room_id, created_at) VALUES ('I am fine)', 2, 1, to_timestamp(1448287343));

--SELECT (password = crypt('entered password', password)) AS pswmatch FROM