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
    const query = `SELECT E.nombreEjercicio AS ejercicio, 
    E.descripcion,
    E.gif,
    STRING_AGG(GM."nomGrupoMuscular", ', ') AS gruposMuscularesAsociados
FROM Ejercicios E
JOIN Ejercicios_GrpMuscular EGM ON E.id = EGM.idEjercicio
JOIN GruposMusculares GM ON EGM.idGrupoMuscular = GM.id
GROUP BY E.nombreEjercicio, E.descripcion, E.gif;

`;
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error);
    res.status(500).send({ error: 'Ocurrió un error al obtener los ejercicios' });
  }
});

    

module.exports = router;