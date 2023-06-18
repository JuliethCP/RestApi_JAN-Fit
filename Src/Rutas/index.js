const {Router} = require('express');
const router = Router();


router.get('/',(req,res)=>{ //ruta inicial
    res.json({"Titulo":"Bienvenido a mi API"});
});

router.get('/test',(req,res)=>{ //ruta inicial
    const data = {
        "Nombre":"Allan",
        "Apellido":"Gonzalez"
    };
    res.json({data});
});

module.exports = router;