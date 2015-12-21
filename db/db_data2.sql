INSERT INTO users (email, password) VALUES ('test2@mail.com', crypt('test2', gen_salt('bf')));

INSERT INTO user_status (user_id, status) VALUES (3, 'offline');

INSERT INTO profile VALUES (3, 'Test', 'avatar_user_3.jpg', '0967777777');

INSERT INTO user_roster (user_id) VALUES (3);

INSERT INTO roster VALUES (3, 1);

INSERT INTO roster VALUES (1, 3);

INSERT INTO room (name, owner_id, last_message_id, last_updated_at) VALUES ('Test chat', 3, 4, to_timestamp(1448287343));

INSERT INTO room_users VALUES (2, 1);

INSERT INTO room_users VALUES (2, 3);

INSERT INTO message (body, sender, room_id, created_at) VALUES ('How are you?', 3, 2, to_timestamp(1448209952));

INSERT INTO message (body, sender, room_id, created_at) VALUES ('I am fine)', 1, 2, to_timestamp(1448287343));