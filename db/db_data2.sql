INSERT INTO user_account (password, email, name, avatar) VALUES ('098f6bcd4621d373cade4e832627b4f6', 'test2@mail2.com', 'Test', 'avatar_user_3.jpg');

INSERT INTO dialog (type) VALUES ('private');

INSERT INTO contact_list (user_id, contact_id, dialog_id) VALUES (1, 3, 2);

INSERT INTO dialog_contact (dialog_id, user_id) VALUES (2, 1);

INSERT INTO dialog_contact (dialog_id, user_id) VALUES (2, 3);

INSERT INTO message (body, sender, dialog, created_at) VALUES ('GO TO HELL Admin!', 3, 2, to_timestamp(1448209952));

INSERT INTO message (body, sender, dialog, created_at) VALUES ('Fuck You User!', 1, 2, to_timestamp(1448287343));