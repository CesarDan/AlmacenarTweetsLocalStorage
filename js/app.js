//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//EventListeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    })
}


//Funciones

function agregarTweet(e){
    e.preventDefault();
    

    const tweet = document.querySelector('#tweet').value;
   //validación
   if(tweet === '') {
    mostrarError('Un mensaje no puede ir vacio');
    return; //evita que se ejecuten más lineas de código
   }

   const tweetObj = {
    id: Date.now(),
    tweet
   }

   //Añadir al arreglo de tweets
   tweets = [...tweets, tweetObj];
   
   //Una vez agregado vamos a crear el HTML
   crearHTML();

   //Reiniciar el formulario

   formulario.reset();
}


//Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent= error;
    mensajeError.classList.add('error');
    
    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despúes de 3 segundos
    setTimeout(()=> {
        mensajeError.remove();
    },3000)
}


//Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0) {
       tweets.forEach(tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'

            //Añadir la función de eliminar

            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el botón
            li.appendChild(btnEliminar);

            //Insertarlo en el html

            listaTweets.appendChild(li);
       })
    }

    sincronizarStorage();
}
//Agrega los tweets actuales a localstorage

function sincronizarStorage(){ 
localStorage.setItem('tweets', JSON.stringify(tweets))
}

//Elimina un tweet

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}


//Limpiar el html

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}