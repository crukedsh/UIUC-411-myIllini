CREATE TABLE `users` (
  `id` varchar(11) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT NOW(),
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `courses` (
  `crn` int COLLATE utf8_unicode_ci NOT NULL DEFAULT 0,
  `user_id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8_unicode_ci,
  `capacity` int COLLATE utf8_unicode_ci NOT NULL DEFAULT 0,
  `enrolled_num` int COLLATE utf8_unicode_ci NOT NULL DEFAULT 0,
  PRIMARY KEY (`crn`),
  FOREIGN KEY (`user_id`) REFERENCES users( `id`),
  CHECK ( `enrolled_num`<= `capacity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `enrollments` (
  `user_id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `crn` int COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `grade` float COLLATE utf8_unicode_ci NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`,`crn`),
  FOREIGN KEY (`user_id`) REFERENCES users( `id`),
  FOREIGN KEY (`crn`) REFERENCES courses(`crn`)
  On delete Cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `schedules` (
  `schedule_id` int COLLATE utf8_unicode_ci NOT NULL auto_increment,
  `crn` int COLLATE utf8_unicode_ci NOT NULL,
  `start_time` time COLLATE utf8_unicode_ci NOT NULL,
  `end_time` time COLLATE utf8_unicode_ci NOT NULL,
  `weekday` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`schedule_id`),
  FOREIGN KEY (`crn`) REFERENCES courses(`crn`)
  On delete Cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `time_conflicts`(
  `crn1` int NOT NULL,
  `crn2` int NOT NULL,
  PRIMARY KEY (`crn1`,`crn2`),
  FOREIGN KEY (`crn1`) REFERENCES courses(`crn`)
    On delete Cascade,
  FOREIGN KEY (`crn2`) REFERENCES courses(`crn`)
    On delete Cascade
);

CREATE TABLE `posts`(
  `post_id` int NOT NULL auto_increment,
  `created_at` datetime NOT NULL DEFAULT NOW(),
  `title` varchar(50) NOT NULL DEFAULT '',
  `content` varchar(300),
  `is_top` tinyint DEFAULT 0,
  `creator` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `crn` int NOT NULL,
  PRIMARY KEY (`post_id`),
  FOREIGN KEY (`creator`) REFERENCES users(`id`)
    On delete Cascade,
  FOREIGN KEY (`crn`) REFERENCES courses(`crn`)
    On delete Cascade
);



