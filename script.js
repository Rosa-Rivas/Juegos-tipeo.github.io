// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
    'Nunca moriria por mis creencias, porque podria estar equivocado.',
    'Debo encontrar una verdad que sea verdad para mi.',
    'Aquel que tiene un porque para vivir se puede enfrentar a todos los comos.',
    'El pasado no tiene poder sobre el momento presente.',
    'Los grandes resultados requieren grandes ambiciones.',
    'La cultura selecta es el opio del pueblo democratico.',
    'Quien sabe del dolor todo lo sabe.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado');
// en el final de nuestro archivo script.js
document.getElementById('inicio').addEventListener('click', () => {
    // elegimos el texto de ejemplo a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length);
    const texto = textos[textoIndice];
    // separamos el texto en un array de palabras
    palabras = texto.split(' ');
    // reestablemos el idice de palabras para el seguimiento
    palabraIndice = 0;
  
    // Actualizamos la interfaz de usuario
    // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
    const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
    // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
    textoElement.innerHTML = spanPalabras.join('');
    // Resaltamos la primer palabra
    textoElement.childNodes[0].className = 'highlight';
    // Borramos los mensajes previos
    messageElement.innerText = '';
  
    // Definimos el elemento textbox
    // Vaciamos el elemento textbox
    typedValueElement.value = '';
    // Definimos el foco en el elemento
    typedValueElement.focus();
    // Establecemos el manejador de eventos
  
    // Iniciamos el contador de tiempo
    startTime = new Date().getTime();
  });
  // al final de nuestro archivo script.js
typedValueElement.addEventListener('input', () => {
  // tomamos la palabra actual
  const currentWord = palabras[palabraIndice];
  // tomamos el valor actual
  const typedValue = typedValueElement.value;
  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    // fin de la sentencia
    // Definimos el mensaje de éxito
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // fin de la palabra
    // vaciamos el valor typedValueElement para la siguiente palabra
    typedValueElement.value = '';
    // movemos a la palabra siguiente
    palabraIndice++;
    // reiniciamos el estado de todas las clases para los textos
    for (const palabraElement of textoElement.childNodes) {
      palabraElement.className = '';
    }
    // resaltamos la palabra actual
    textoElement.childNodes[palabraIndice].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // correcta actual
    // resaltar la siguiente palabra
    typedValueElement.className = '';
  } else {
    // estado error
    typedValueElement.className = 'error';
  }
});
