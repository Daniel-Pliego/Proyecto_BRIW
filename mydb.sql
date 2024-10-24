-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2024 a las 21:42:30
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_visited_status2` (IN `user_id` INT)   BEGIN
    DECLARE hours_difference INT;
    DECLARE url_updated TIMESTAMP;
    DECLARE url_frecuency INT;
    DECLARE id_row INT;
    
    -- Declarar el cursor para iterar sobre las filas
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR 
        SELECT u.updated, u.frecuency, u.id
        FROM mydb.urls u
        JOIN mydb.users_profiles up ON u.id_profile = up.id
        WHERE up.id_user = user_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Crear tabla temporal para almacenar los IDs de las filas afectadas
    CREATE TEMPORARY TABLE affected_ids (id INT);

    -- Iterar sobre las filas de la tabla para el usuario específico
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO url_updated, url_frecuency, id_row;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Calcular la diferencia en horas
        SET hours_difference = TIMESTAMPDIFF(HOUR, url_updated, NOW());

        -- Actualizar la columna visited y updated si la diferencia de horas es mayor o igual que la frecuencia
        IF hours_difference >= url_frecuency THEN
            UPDATE mydb.urls 
            SET visited = 0, updated = CURRENT_TIMESTAMP 
            WHERE id = id_row;
            
            -- Agregar el ID de la fila afectada a la tabla temporal
            INSERT INTO affected_ids VALUES (id_row);
        END IF;
    END LOOP;
    CLOSE cur;

    -- Seleccionar todas las filas afectadas y devolverlas como resultado
    SELECT * FROM mydb.urls WHERE id IN (SELECT id FROM affected_ids);

    -- Limpiar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS affected_ids;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `urls`
--

CREATE TABLE `urls` (
  `id` int(11) NOT NULL,
  `id_profile` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `visited` tinyint(1) NOT NULL,
  `frecuency` int(11) NOT NULL,
  `updated` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `urls`
--

INSERT INTO `urls` (`id`, `id_profile`, `name`, `url`, `visited`, `frecuency`, `updated`) VALUES
(1, 1, 'Cobay', 'https://cobay.yucatan.gob.mx/', 1, 3, '0000-00-00 00:00:00.000'),
(2, 1, 'UADY', 'https://uady.mx/', 1, 2, '0000-00-00 00:00:00.000'),
(3, 1, 'Tortugas', 'https://www.natgeokids.com/uk/discover/animals/sea-life/turtle-facts/', 1, 3, '0000-00-00 00:00:00.000'),
(4, 1, 'Futbol', 'https://www.tudn.com/mx/futbol', 1, 3, '0000-00-00 00:00:00.000'),
(5, 1, 'Quimica', 'https://es.khanacademy.org/science/chemistry', 1, 2, '0000-00-00 00:00:00.000'),
(6, 1, 'Blog', 'https://www.wagslane.dev/posts/collapsing-quality-of-devto/', 1, 3, '0000-00-00 00:00:00.000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `created`, `updated`) VALUES
(1, 'jsantana', 'jonatan', '', '0000-00-00 00:00:00.000', '0000-00-00 00:00:00.000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_profiles`
--

CREATE TABLE `users_profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users_profiles`
--

INSERT INTO `users_profiles` (`id`, `name`, `id_user`, `created`) VALUES
(1, 'Escuelas', 1, '2024-05-20 12:38:45.602'),
(2, 'Animales', 1, '2024-05-20 13:40:50.382');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('a7affd43-d147-42bd-bfb4-a8777fa889d8', '1ce4acf98752af7b3988eee9de7eea312de2a3c6e71ec1f053a04b9db9853b4e', '2024-05-16 03:04:50.064', '20240516021208_init', NULL, NULL, '2024-05-16 03:04:49.985', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `urls`
--
ALTER TABLE `urls`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD UNIQUE KEY `users_username_key` (`username`);

--
-- Indices de la tabla `users_profiles`
--
ALTER TABLE `users_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_profiles_name_key` (`name`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `urls`
--
ALTER TABLE `urls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users_profiles`
--
ALTER TABLE `users_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
