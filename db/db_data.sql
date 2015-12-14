--create 'admin' user with 'admin' password
INSERT INTO user_account (password, email, name, avatar) VALUES ('21232f297a57a5a743894a0e4a801fc3', 'test@mail.com', 'Admin', 'avatar_user_1');

--create 'user' user with 'user' password
INSERT INTO user_account (password, email, name, avatar) VALUES ('ee11cbb19052e40b07aac0ca060c23ee', 'test@mail2.com', 'User', 'avatar_user_2.jpg');

INSERT INTO dialog (type) VALUES ('private');

--add contact 'user'
INSERT INTO contact_list (user_id, contact_id, dialog_id) VALUES (1, 2, 1);

--add contact 'user'
INSERT INTO contact_list (user_id, contact_id, dialog_id) VALUES (2, 1, 1);

INSERT INTO dialog_contact (dialog_id, user_id) VALUES (1, 1);

INSERT INTO dialog_contact (dialog_id, user_id) VALUES (1, 2);

INSERT INTO message (body, sender, dialog, created_at) VALUES ('Hello Admin!', 2, 1, to_timestamp(1448209952));

INSERT INTO message (body, sender, dialog, created_at) VALUES ('Hello User!', 1, 1, to_timestamp(1448287343));


INSERT INTO user_account (password, email, name, avatar) VALUES ('098f6bcd4621d373cade4e832627b4f6', 'test2@mail2.com', 'Test', 'avatar_user_3.jpg');

INSERT INTO dialog (type) VALUES ('private');

INSERT INTO contact_list (user_id, contact_id, dialog_id) VALUES (1, 3, 2);

INSERT INTO dialog_contact (dialog_id, user_id) VALUES (2, 1);

INSERT INTO dialog_contact (dialog_id, user_id) VALUES (2, 3);

INSERT INTO message (body, sender, dialog, created_at) VALUES ('How are you?', 3, 2, to_timestamp(1448209952));

INSERT INTO message (body, sender, dialog, created_at) VALUES ('I am fine)', 1, 2, to_timestamp(1448287343));