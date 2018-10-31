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
  `capacity` int COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`crn`),
  FOREIGN KEY (`user_id`) REFERENCES users( `id`)
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



