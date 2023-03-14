const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const generoRouter = require ("./generoRouter");
const videoGamesRouter = require ("./videoGamesRoute");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGamesRouter);
router.use("/genres", generoRouter);






module.exports = router;