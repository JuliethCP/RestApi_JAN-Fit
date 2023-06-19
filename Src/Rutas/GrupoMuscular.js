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
    const query = `SELECT GM."nomGrupoMuscular" AS grupoMuscular, 
    STRING_AGG(E.id || '-' || E.nombreEjercicio, ', ') AS ejerciciosAsociados
FROM Ejercicios E
JOIN Ejercicios_GrpMuscular EGM ON E.id = EGM.idEjercicio
JOIN GruposMusculares GM ON EGM.idGrupoMuscular = GM.id
GROUP BY GM."nomGrupoMuscular";

`;
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error('Error al obtener los grupos musculares:', error);
    res.status(500).send({ error: 'Ocurrió un error al obtener los grupos musculares' });
  }
});

    

module.exports = router;