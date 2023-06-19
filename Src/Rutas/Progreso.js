const { Router } = require('express');
const router = Router();
const pgPromise = require('pg-promise');
const { Pool } = require('pg');


const dbConfig = {
  user: 'postgres',
  password: '123e45678',
  host: 'localhost',
  port: 5432,
  database: 'JAN-Fit'
};  

const pool = new Pool(dbConfig);

// Conectarse a la base de datos
pool.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

router.get('/', async (req, res) => {
  try {
    const query = `SELECT U.nombre , Pr.peso, Pr.altura, Pr.imc
    FROM Usuarios U
    JOIN Progreso Pr ON U.id = Pr.iduser;`;
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send({ error: 'Ocurrió un error al obtener los usuarios' });
  }
});

    
router.post('/', async (req, res) => {
  try {
    const { idUser, peso, altura, imc } = req.body;

    if (!idUser) {
      res.status(400).send({ error: 'Falta el id del usuario' });
      return;
    }
//CALL insertar_progreso(2, 46, 1.56, 18.90);
    if (!peso) {
      res.status(400).send({ error: 'Falta el peso del usuario' });
      return;
    }

    if (!altura) {
      res.status(400).send({ error: 'Falta el altura del usuario' });
      return;
    }

    if (!imc) {
      res.status(400).send({ error: 'Falta la imc del usuario' });
      return;
    }

    const query = `
        CALL insertar_progreso($1, $2, $3, $4);
    `;

   const result = await pool.query(query, [idUser, peso, altura, imc]);

    res.send('Información del usuario guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
   // res.status(500).send({ error: 'Ocurrió un error al guardar el usuario' });
  }
});

module.exports = router;
