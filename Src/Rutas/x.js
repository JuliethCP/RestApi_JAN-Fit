const { Router } = require('express');
const router = Router();
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
    const query = 'SELECT * FROM Usuarios';
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send({ error: 'Ocurrió un error al obtener los usuarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contrasena, fechaNacimiento } = req.body;

    if (!nombre) {
      res.status(400).send({ error: 'Falta el NOMBRE del usuario' });
      return;
    }

    if (!correo) {
      res.status(400).send({ error: 'Falta el CORREO del usuario' });
      return;
    }

    if (!contrasena) {
      res.status(400).send({ error: 'Falta el PASSWORD del usuario' });
      return;
    }

    if (!fechaNacimiento) {
      res.status(400).send({ error: 'Falta la FECHANACIMIENTO del usuario' });
      return;
    }

    const query = `
      INSERT INTO Usuarios (nombre, correo, contrasena, fechaNacimiento)
      VALUES ($1, $2, $3, $4)
    `;

    const result = await pool.query(query, [nombre, correo, contrasena, fechaNacimiento]);

    res.send('Usuario guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).send({ error: 'Ocurrió un error al guardar el usuario' });
  }
});

module.exports = router;
