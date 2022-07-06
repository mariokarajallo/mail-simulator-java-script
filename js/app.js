//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');


//variables del formulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();
function eventListener(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

    // reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //enviar email
    // formulario.addEventListener('submit', enviarEmail);
    btnEnviar.addEventListener('click',enviarEmail);




}



//funciones
function iniciarApp(){
    btnEnviar.disabled=true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50')
}

//validar formularios
function validarFormulario(e){


    if (e.target.value.length > 0){

        //elimina los errores
        const error = document.querySelector('p.error');
        if (error){
            error.remove();
        }
        

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');


        console.log('tiene algo');
    } else {
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    // validar email
    if (e.target.type==='email'){
        // validar con expresion regular ER
        

        if (er.test(e.target.value)){
            // console.log('email valido');
            //elimina los errores
            const error = document.querySelector('p.error');
            if (error){
                error.remove();
            }
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            console.log('email no valido');
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido')
        }
        //validar email sin expresion regular
        // //indexof busca dentro de un string o cadena de texto devuelve la posicion si lo encuentra y si no da -1
        // const resultado = e.target.value.indexOf('@');
        // if (resultado<0){
        //     mostrarError('El email no es valido')
        // }
    }

    //habilitar boton de enviar
    if (er.test(email.value) && asunto.value !=='' && mensaje.value !==''){
        btnEnviar.disabled=false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50')
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-color-100','text-red-500','p-3','mt-3','error');

    //agregar el mensaje de error 
    const errores = document.querySelectorAll('.error');
    // console.log(errores.length);
    if (errores.length===0){
        formulario.appendChild(mensajeError);
    }
    

}

//enviar el email
function enviarEmail (e){
    //prevenir la accion por defecto de un boton
    e.preventDefault();
    // console.log('enviando...');
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex'

    // despues de 3seg ocultar el spinner y mostrar el mensaje
    // setTimeout se ejecuta una vez despues de la cantidad de tiempo establecida
    setTimeout(()=>{
        spinner.style.display='none';

        // mensaje de enviado correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent='El mensaje se envio correctamente';
        parrafo.classList.add('text-center','bg-green-500','my-10','p-2','text-white','font-bold','uppercase')

        //inserta el parrafo antes del espinner 
        formulario.insertBefore(parrafo, spinner);

        //eliminar el parrafo
        setTimeout(()=>{
            parrafo.remove();//eliminar el mensaje de enviado
            resetearFormulario();//llama funcion resetear formulario
        },5000)
    },3000)

}

//funcion que resetea el formulario
function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}