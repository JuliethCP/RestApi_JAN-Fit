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
    const query = `SELECT R.nombreRutina, 
    STRING_AGG('- ' || E.nombreEjercicio || ' (Repeticiones: ' || COALESCE(RE.repeticiones::text, 'N/A') || ', Tiempo: ' || COALESCE(RE.tiempo::text, 'N/A') || ')', E'\n') AS ejercicios_asociados
FROM Rutinas R
JOIN Rutina_Ejercicios RE ON R.id = RE.idRutina
JOIN Ejercicios E ON RE.idEjercicio = E.id
GROUP BY R.nombreRutina;`;
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error('Error al obtener los Rutinas:', error);
    res.status(500).send({ error: 'Ocurrió un error al obtener los Rutinas' });
  }
});

    


module.exports = router;