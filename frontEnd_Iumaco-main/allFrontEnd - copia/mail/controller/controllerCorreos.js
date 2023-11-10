const { request, response } = require('express');
const nodemailer = require('nodemailer');


const envioCorreo = (req=request,resp=response) =>{
    let body = req.body;

    let config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'carlos.vasquez180@misena.edu.co',
            pass: 'bpdp ssnk olpt ozjb'
        }
    });

    const opciones = {
        from: 'Programacion',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
    };

    config.sendMail(opciones,function(error,result){

        if (error) return resp.json({ok:false,msg:error})
        return resp.json({
            ok:true,
            msg:result
        });
    })
}


module.exports = {
    envioCorreo
}