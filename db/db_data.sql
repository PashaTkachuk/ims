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