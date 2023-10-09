DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "user_id" int8 NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    "activated" bool NOT NULL,
    "email" varchar(320) NOT NULL,
    "exp" int8 NOT NULL,
    "level" int4 NOT NULL,
    "nickname" varchar(16) NOT NULL,
    "password" varchar(255) NOT NULL,
    "profile" varchar(255) NOT NULL,
    "refresh_token" varchar(255),
    "role" varchar(20) NOT NULL,
    "sign_up_at" timestamp NOT NULL,
    "social_id" varchar(255),
    "social_type" varchar(10) NOT NULL,
    "total_game" int8 NOT NULL,
    "update_at" timestamp NOT NULL,
    "win" int4 NOT NULL,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."users" ("user_id", "activated", "email", "exp", "level", "nickname", "password", "profile", "refresh_token", "role", "sign_up_at", "social_id", "social_type", "total_game", "update_at", "win") VALUES
(18, 't', 'hi@hi.com', 0, 1, '히영4', '{bcrypt}$2a$10$fhHL0VCaRILg9/YAvvVgzeuFy.RtMfp9njpqR0AvJsavR8wy57wwS', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 20:21:54.583499', NULL, 'NONE', 0, '2023-10-05 20:21:54.719777', 0);
INSERT INTO "public"."users" ("user_id", "activated", "email", "exp", "level", "nickname", "password", "profile", "refresh_token", "role", "sign_up_at", "social_id", "social_type", "total_game", "update_at", "win") VALUES
(7, 'f', 'con', 0, 0, 'con', '{bcrypt}$2a$10$5Dxel9lXDMgYq6fzZzlYgeFZDwv9mUUuXLIcyXPt0qsZ9cMfxL/1.', '/images/character/rabbit3.png', NULL, 'VIP', '2023-10-05 10:56:38.260392', NULL, 'NONE', 0, '2023-10-05 20:22:09.505903', 0);
INSERT INTO "public"."users" ("user_id", "activated", "email", "exp", "level", "nickname", "password", "profile", "refresh_token", "role", "sign_up_at", "social_id", "social_type", "total_game", "update_at", "win") VALUES
(8, 'f', 'coach', 0, 0, 'coach_부', '{bcrypt}$2a$10$Lf3kHqDYmBrUpwJ6vINxN.XqXi8E1JHmgT.Sei0U7NcGHxptUkLBu', '/images/character/rabbit8.png', NULL, 'VIP', '2023-10-05 10:56:44.985812', NULL, 'NONE', 0, '2023-10-06 00:46:47.683013', 0);
INSERT INTO "public"."users" ("user_id", "activated", "email", "exp", "level", "nickname", "password", "profile", "refresh_token", "role", "sign_up_at", "social_id", "social_type", "total_game", "update_at", "win") VALUES
(19, 't', 'ygangmin@gmail.com', 0, 1, '발표싫어', '{bcrypt}$2a$10$tQ0rC9BdTMMvr7qLSWwguuQXxe.5ACPnRzO8yLtNyOc7RHqhWGmEa', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:46:53.471872', NULL, 'NONE', 0, '2023-10-06 00:46:53.59758', 0),
(10, 'f', 'spacegg', 0, 4, '우주계란', '{bcrypt}$2a$10$Azc66XYON/U70IrjIMwv.ei9U7xQOXsIOPEN1667NLEmYtm5UhMPq', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 11:52:46.62235', NULL, 'NONE', 0, '2023-10-05 11:52:46.62235', 0),
(9, 'f', 'cj', 0, 4, '탈옥한경찰', '{bcrypt}$2a$10$wJMYZ.UoEUc6j13HOmHCc.G5pY.TxIHxHS1UXwbod3a8zWszNy0o6', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 11:50:01.860081', NULL, 'NONE', 0, '2023-10-05 11:50:01.860081', 0),
(1, 't', 'hi', 0, 10, '히영', '{bcrypt}$2a$10$cBGMJBF0.Js9jCQnOqsWMux.jJe9CRJzf8hrJv4gDsKv1nwJeBDCW', '/images/character/rabbit1.png', NULL, 'MANAGER', '2023-10-05 10:54:18.744195', NULL, 'NONE', 0, '2023-10-06 00:27:16.545459', 0),
(2, 'f', 'meeseeks', 0, 6, 'meeseeks', '{bcrypt}$2a$10$3F7IQBUPT7HUjpzghwXMHePU1TbQM69WAWKgEw24jHlNQDrmdD/4u', '/images/character/rabbit8.png', NULL, 'MANAGER', '2023-10-05 10:54:47.941807', NULL, 'NONE', 0, '2023-10-06 00:47:16.711902', 0),
(11, 'f', 'test2', 0, 3, '상식왕', '{bcrypt}$2a$10$VSTXVx8E3qcmc6h43NX4Hunl5hcuZoehzJKDm..3ER6Or3UvcKz.2', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 11:56:39.713424', NULL, 'NONE', 0, '2023-10-05 23:58:16.649649', 0),
(13, 't', 'asd@naver.com', 0, 1, 'ddd', '{bcrypt}$2a$10$icIshxYbRd8dVOEVBUXC7.JKwnjnIW9y/BRQq/mhsP1FH2FpacqUa', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 04:27:01.047499', NULL, 'NONE', 0, '2023-10-05 04:27:01.177791', 0),
(12, 'f', 'test3', 0, 3, '와이라노사우르스', '{bcrypt}$2a$10$w8UA5CVb7F3n0pHQ3gkA7en1SiqVM/NtxwaKFsHNcpHfw9ojV.yjy', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 11:56:55.243344', NULL, 'NONE', 0, '2023-10-05 23:58:33.747144', 0),
(23, 't', 'napol@kakao.com', 0, 1, '누워자고싶다', '{bcrypt}$2a$10$SJl3LM/07xJN2aZaQMhXBepFL952qEW0Bvz.NOGI8aVlS3L0n4I2u', '/images/character/rabbit8.png', NULL, 'USER', '2023-10-06 00:47:52.117522', NULL, 'NONE', 0, '2023-10-06 00:56:53.358935', 0),
(20, 't', 'hanmo1234@naver.com', 0, 1, '김한모', '{bcrypt}$2a$10$NRByrzMEzvieZ5CafplWou6bVU/oWtC3sfnMQFhw7zt0bsuBoCX6S', '/images/character/rabbit1.png', NULL, 'USER', '2023-10-06 00:47:03.373468', NULL, 'NONE', 0, '2023-10-06 00:53:15.979948', 0),
(16, 't', 'hi1@hi.com', 0, 1, '히영2', '{bcrypt}$2a$10$zJUz.Hn9VM1b/fpiCKgrPuSJrK4BrH1Gj4tI67K28oyd7mHk5v6tm', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 20:20:32.305755', NULL, 'NONE', 0, '2023-10-05 20:20:32.444421', 0),
(24, 't', 'pdy051257@naver.com', 0, 1, '안뇽', '{bcrypt}$2a$10$8EWhPvAoO7JwCr0coxreTusGBovPDO08uSlWX88qh3Pa.AmlpPG7O', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:48:38.138211', NULL, 'NONE', 0, '2023-10-06 00:48:38.274846', 0),
(17, 't', 'hi2@hi.com', 0, 1, '히영3', '{bcrypt}$2a$10$AggXYrniHi/NYFiOsd92XOrMawyy8iXzTPijK3sfln7cGtXCN35nK', '/images/character/rabbit.png', NULL, 'USER', '2023-10-05 20:21:09.854871', NULL, 'NONE', 0, '2023-10-05 20:21:09.987829', 0),
(3, 'f', 'sewool', 0, 5, 'sewool', '{bcrypt}$2a$10$ijXxxd9KlZYJAOTSEylTeuBWXB2jOzm/PuQUufEIQ16unMq8ymnOy', '/images/character/rabbit4.png', NULL, 'MANAGER', '2023-10-05 10:54:58.531396', NULL, 'NONE', 0, '2023-10-06 00:44:05.115634', 0),
(21, 't', 'aaaa@aa.aa', 0, 1, '집에보내줘', '{bcrypt}$2a$10$VK5T/GvCqthvwo.FQcS7QuHDU5ihVFDGyHgXcEqGWu7Av.bqqGog.', '/images/character/rabbit14.png', NULL, 'USER', '2023-10-06 00:47:09.802739', NULL, 'NONE', 0, '2023-10-06 00:48:26.014615', 0),
(6, 't', 'test', 0, 7, '태환', '{bcrypt}$2a$10$ImChv8NY0yhSnYiv7Pxig.hPsVoLyk.9ZEu8ytZB1GOkOhXFB.NEm', '/images/character/rabbit1.png', NULL, 'MANAGER', '2023-10-05 10:56:03.790064', NULL, 'NONE', 0, '2023-10-06 00:45:20.66198', 0),
(14, 'f', 'rudgnscoach@ssafy.com', 0, 1, '경훈코치', '{bcrypt}$2a$10$MeYFQ/f12d6f4uTcW2mvweuqCLXvF8GUQteov3Oc4Gvhjz477lEGm', '/images/character/rabbit2.png', NULL, 'USER', '2023-10-05 07:24:34.68931', NULL, 'NONE', 0, '2023-10-06 00:45:33.940679', 0),
(29, 't', 'ssafy@ssafy.com', 0, 1, '잘생긴최진석', '{bcrypt}$2a$10$KsuYxCuT9X429aD03TNnUOtaKpj93lWDj9qQIIQjJHjG/vHJgLgUm', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:51:02.944827', NULL, 'NONE', 0, '2023-10-06 00:52:47.177893', 0),
(25, 't', 'sss@123.com', 0, 1, 'fqwufw', '{bcrypt}$2a$10$21Wg1WvqAu8aiAo8A7CeOePHHjhqXl9SHLIVCw0ZFdDFzD7KBD3De', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:48:59.255375', NULL, 'NONE', 0, '2023-10-06 00:48:59.379492', 0),
(4, 't', 'yuseong', 0, 9, '유성', '{bcrypt}$2a$10$62cN.66PtHwsSLDmPOmIZuXiv0/.70clhpNqbwZRQkjNIJ13dmdGy', '/images/character/rabbit15.png', NULL, 'MANAGER', '2023-10-05 10:55:04.422131', NULL, 'NONE', 0, '2023-10-06 00:46:35.624045', 0),
(26, 't', 'admin@admin.com', 0, 1, 'admin', '{bcrypt}$2a$10$EJe15CbdJDPnVD47Lxnzf.v86WE7R12JwT/DcDX/Egxoz2kJ7KTva', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:49:04.866688', NULL, 'NONE', 0, '2023-10-06 00:49:04.993556', 0),
(28, 't', 'asdf@asdf.com', 0, 1, '대방안유진', '{bcrypt}$2a$10$nxmW9yVG.1StSPD4vPoq8uuHz/P7Dnn3LLnaiyf6Sw2qhjnLK2HKW', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:50:45.474341', NULL, 'NONE', 0, '2023-10-06 00:50:45.599217', 0),
(15, 't', '123@123.com', 0, 1, '구희영바보', '{bcrypt}$2a$10$lXp418UAJGmN/F9PnKxyfuqgWyXdHFX9dpySPqoIUHp9.5z.WTnY6', '/images/character/rabbit10.png', NULL, 'USER', '2023-10-05 08:37:19.295372', NULL, 'NONE', 0, '2023-10-06 00:52:35.459265', 0),
(27, 't', 'um@junsic.dongtan', 0, 1, '삐따기', '{bcrypt}$2a$10$0LeU3CtwqfI5tSafBcXnruAjple3Ygs5p.iwZRBue46eTRFSMbu3u', '/images/character/rabbit9.png', NULL, 'USER', '2023-10-06 00:49:10.545341', NULL, 'NONE', 0, '2023-10-06 00:52:40.817209', 0),
(31, 'f', 'deer119@naver.com', 0, 1, '간지작살구배성', '{bcrypt}$2a$10$Xu/.qNU3LFOsXM652lIMAeuEVntogcPnimL5oYn.JedbJbzudpkWy', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:53:06.173641', NULL, 'NONE', 0, '2023-10-06 00:56:43.907795', 0),
(22, 'f', 'asdf@naver.com', 0, 1, '우와', '{bcrypt}$2a$10$f/Z5RDijGGbgPjoFM8CMM.LTOr8knyB0Gi8OcDOfUZUWovCjUI9im', '/images/character/rabbit14.png', NULL, 'USER', '2023-10-06 00:47:23.218907', NULL, 'NONE', 0, '2023-10-06 00:53:30.431282', 0),
(32, 't', 'wjdgusdnmfsdfkln@asdfasdfasdf.com', 0, 1, 'asdf', '{bcrypt}$2a$10$QBxaL1TTKGpiDf53zpdrGeM1kF0rqCLsOE8ws65Y3T6BiXn4BVjtm', '/images/character/rabbit.png', NULL, 'USER', '2023-10-06 00:54:37.775003', NULL, 'NONE', 0, '2023-10-06 00:54:37.913214', 0),
(5, 't', 'siksik', 0, 8, '식식', '{bcrypt}$2a$10$xkwFXp85NBXmozCMZzznbuLJOyQPSoytU6zJKanmInjOthMk7S5Za', '/images/character/rabbit14.png', NULL, 'MANAGER', '2023-10-05 10:55:15.152107', NULL, 'NONE', 0, '2023-10-06 00:56:32.881582', 0);