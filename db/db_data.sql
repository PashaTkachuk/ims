--create 'admin' user with 'admin' password
INSERT INTO user_account (username, password, email) VALUES ('admin', '21232f297a57a5a743894a0e4a801fc3', 'test@mail.com');

--create 'user' user with 'user' password
INSERT INTO user_account (username, password, email) VALUES ('user', 'ee11cbb19052e40b07aac0ca060c23ee', 'test@mail2.com');

--add contact 'user'
INSERT INTO contact_list (user_id, contact_id) VALUES (1, 2);

--add contact 'user'
INSERT INTO contact_list (user_id, contact_id) VALUES (2, 1);

INSERT INTO message (body, sender) VALUES ('Hello Admin!', 2);

INSERT INTO message (body, sender) VALUES ('Hello User!', 1);

INSERT INTO message_recipient (message_id, recipient_id) VALUES (1, 1);

INSERT INTO message_recipient (message_id, recipient_id) VALUES (2, 2);
