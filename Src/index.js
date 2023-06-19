
const express = require('express');
//const cors = require('cors');
const app = express();
const morgan = require('morgan');


//app.use(cors());

//configuraciones
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);


//midelware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//rutas
app.use(require('./Rutas/index'));
app.use('/api/ejercicios',require('./Rutas/Ejercicios'));
app.use('/api/Rutinas',require('./Rutas/Rutinas'));
app.use('/api/Usuarios',require('./Rutas/Usuarios'));
app.use('/api/rutina_ejercicios',require('./Rutas/Rutina_Ejercicios'));
app.use('/api/progreso',require('./Rutas/Progreso'));
app.use('/api/grupos_musculares',require('./Rutas/GrupoMuscular'));

//inicio del servidor
app.listen(app.get('port'),()=>{
    
    console.log('Server is running on port ',app.get('port'));

});