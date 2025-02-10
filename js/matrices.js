const modojuego = document.querySelector(".notificacion"); //sirve para seleccionar un elemento en HTML.

const movimientos = ["", "", "", "", "", "", "", "", ""];
const ganador = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];

const mensajeGanador = () => "El jugador de la " + numJugador + " ha ganado"; // se crea constantes con funciones ya que tiene una variable cambiante
const mensajEmpate = () => "El juego ha quedado en empate";
const turnoJugador = () => "Turno de " + numJugador;

let turno = true; //cuando el juego no ha terminado o empezado.
let numJugador = "X";

function inicioJuego() {
  estadoJuego(turnoJugador()); //sirve para mostrar que jugador empieza, quien ganó o empata el juego
  resultadoJuego(); //notifica el resultado del juego.
}
inicioJuego(); //se llama la función para que imprima los datos del juego.

function estadoJuego(mensaje) {
  modojuego.innerText = mensaje;
};

function verificarCasillas(interaccion) {
  const casilla = interaccion.target; // Esta propiedad se utiliza para acceder al elemento específico que fue clicado. Por ejemplo, si un usuario hace clic en una casilla del juego, interaccion.target se refiere a esa casilla específica.

  if (casilla.classList.contains("bordes")) { //el contains es para verificar si el elemento contiene la clase.  Este método verifica si el elemento casilla tiene la clase "bordes". Si la clase está presente, el método devuelve true; de lo contrario, devuelve false.
    const index = Array.from(casilla.parentNode.children).indexOf(casilla); //casilla.parentNode.children: Esto devuelve una colección de elementos hijos del nodo padre de casilla. Sin embargo, esta colección no es un array, sino un objeto HTMLCollection. Array.from(casilla.parentNode.children): Este método convierte la HTMLCollection en un array real, lo que permite utilizar métodos de array como indexOf.indexOf(casilla): Después de convertir a un array, se utiliza indexOf para encontrar el índice de casilla dentro del nuevo array.

    if (movimientos[index] !== "" || !turno) {
      return;
    } // si la casilla no está vacía o no es el turno del jugador, no se puede seleccionar.
    casillajugadores(casilla, index);
    verificarjuego();
  };
};

function casillajugadores(casilla, index) { 
  movimientos[index] = numJugador; //almacena el dato del jugador en la casilla que da click.
  casilla.innerText = numJugador; //imprime el dato del jugador en la casilla que da click.
};

let marcadorx = 0; //se colocan fuera de la funcion para evitar el reinicio del marcador cada vez que se juega
let marcadoro = 0;

let posicion1 = ""; //sirve para comparar los datos del arreglo movimientos con las condiciones de ganar.
let posicion2 = "";
let posicion3 = "";

const imagenJ1 = document.getElementById("cambiarImg1");
const imagenJ2 = document.getElementById("cambiarImg2");
const puntaje = document.getElementById("tipoLetra1");

const reiniciar = document.querySelector(".reiniciar");

const ganadorJuego = document.getElementById("ganador");
let mostrarGanador = document.querySelectorAll(".modalJ")[0];
let modalConteiner = document.querySelectorAll(".animacion")[0];
const cerrarModal = document.getElementById("cerrarJ");

function verificarjuego() {
  let juegoG = false; //se coloca para cuando el jugador gane.

  for (let i = 0; i < ganador.length; i++) { //sirve para recorrer cada una de las condiciones para ganar
    const condicion = ganador[i]; //selecciona cada una de las condiciones de ganar [0,1,2], luego[3,4,5] etc.

    posicion1 = movimientos[condicion[0]]; //sirve para comparar los datos del arreglo movimientos con las condiciones de ganar.
    posicion2 = movimientos[condicion[1]]; 
    posicion3 = movimientos[condicion[2]];


    if (posicion1 === "" || posicion2 === "" || posicion3 === "") {
      continue; //sirve para que continue con las condiciones de la matriz    
    } //si no hay datos en las casillas, no se cumple la condición de ganar

    if (posicion1 === posicion2 && posicion2 === posicion3) {
      juegoG = true; // hace que salga del ciclo

      condicion.forEach(index => {
        const casillaGanadora = document.querySelectorAll(".bordes")[index];
        casillaGanadora.classList.add("verde");
      });
      // Cambiar el color de las demás casillas
      document.querySelectorAll(".bordes").forEach((casilla, index) => {
        if (!condicion.includes(index)) {   //esta función sirve para que no cambie el color de las casillas que ya estan en verde
          casilla.classList.add("rojo");
        }
      });

      const punto1 = document.getElementById("puntosj1");
      const punto2 = document.getElementById("puntosj2");

      if (posicion1 === "X") {
        marcadorx++;
        punto1.innerText = marcadorx;
        imagenJ1.src = "./img/win.png";
        imagenJ1.classList.add("win");
        cambioLetras1.classList.remove("cambioLetra");

        imagenJ2.src = "./img/lose.png";
        imagenJ2.classList.remove("win");
        cambioLetras2.classList.remove("cambioLetra");
        reiniciar.disabled = false;

      } else {
        if (posicion1 === "O") {
          marcadoro++;
          punto2.innerText = marcadoro;
          imagenJ2.src = "./img/win.png";
          imagenJ2.classList.add("win");
          cambioLetras2.classList.remove("cambioLetra");

          imagenJ1.src = "./img/lose.png";
          imagenJ1.classList.remove("wait");
          cambioLetras1.classList.remove("cambioLetra");
          reiniciar.disabled = false;
        };
      };
    };
  };

  if (juegoG) { //si es true, muestra el mensaje del ganador.
    estadoJuego(mensajeGanador());
    turno = false;

    if (marcadorx === 5) {  //intetar cambiar el marcador con un input desde HTML, desde el iniciar. En ambos marcadores.
      ganadorJuego.innerText = "Ganador: el jugador de la letra " + numJugador + " con " + marcadorx + " puntos.";
      mostrarModal();
      cerrarModal.onclick = () => {
        ocultarModal();
      };
      reiniciar.disabled = true;
    } else {
      if (marcadoro === 5) {
        ganadorJuego.innerText = "Ganador: el jugador de la letra " + numJugador + " con " + marcadoro + " puntos. ";
        mostrarModal();
        cerrarModal.onclick = () => {
          ocultarModal();
        reiniciar.disabled = true;
      };
    };
    };
    return;
  };

  let casillasVacias = !movimientos.includes(""); //sirve para verificar las casillas vacías, si es true es porque tiene un valor, si es false es que está vacio. 

  if (casillasVacias) {
    estadoJuego(mensajEmpate()); //cuando no hay casillas vacías, se muestra el mensaje de empate, porque no cumplió con las condiciones para ganar.
    turno = false;
    reiniciar.disabled = false;
    return;
  };
  oponente();
};

function mostrarModal() {
  modalConteiner.classList.add("modalResponsive");    
  mostrarGanador.classList.toggle("modalGanador");  //alterna el estilo de modalGanador, si esta en - lo alterna a +
};

function ocultarModal() {
  mostrarGanador.classList.toggle("modalGanador");
  setTimeout(
    function () {
      modalConteiner.classList.add("ocultarModal");
      modalConteiner.classList.remove("modalResponsive");
    }, 1000);
};

const cambioLetras1 = document.getElementById("tipoLetra1");
const cambioLetras2 = document.getElementById("tipoLetra2");

function oponente() {
  numJugador = (numJugador === "X") ? numJugador = "O" : numJugador = "X";
  estadoJuego(turnoJugador());

  if (numJugador === "X") {
    imagenJ2.src = "./img/wait.png";
    imagenJ2.classList.add("wait");
    cambioLetras2.classList.add("cambioLetra");

    imagenJ1.src = "./img/play.png";
    imagenJ1.classList.remove("wait");
    cambioLetras1.classList.remove("cambioLetra");

    reiniciar.disabled = true;

  } else {
    imagenJ1.src = "./img/wait.png";
    imagenJ1.classList.add("wait");
    cambioLetras1.classList.add("cambioLetra");

    imagenJ2.src = "./img/play.png";
    imagenJ2.classList.remove("wait");
    cambioLetras2.classList.remove("cambioLetra");
    reiniciar.disabled = true;
  };
};

function resultadoJuego() {
  const prueba = document.querySelector(".juego");
  prueba.addEventListener("click", verificarCasillas);

  const reiniciar = document.querySelector(".reiniciar");
  reiniciar.addEventListener("click", reiniciarJuego);

  const nuevojuego = document.querySelector(".nuevoJuego");
  nuevojuego.addEventListener("click", nuevoJuego);
};

function reiniciarJuego() {
  turno = true;
  if (numJugador == "X") {
    numJugador = "O";
  } else {
    if (numJugador == "O") {
      numJugador = "X";
    }
  }
  reiniciarJ();
  estadoJuego(turnoJugador());

  const reincioJuego = document.querySelectorAll(".bordes"); //selecciona todos los elementos con la clase "bordes"
  reincioJuego.forEach(casilla => {
    casilla.innerText = ""; //elimina el texto de cada casilla
    casilla.classList.remove("verde", "rojo"); //elimina las clases "verde" y "rojo"
  });
  reiniciar.disabled = false;
};

function reiniciarJ() {
  let i = movimientos.length;
  while (i--) { movimientos[i] = ""; } //se crea un bucle que se repite hasta que se vacíe el array movimientosn. Cuando detecta números negativos sale del bucle.

  if (numJugador === "X") {
    imagenJ2.src = "./img/wait.png";
    imagenJ2.classList.add("wait");
    cambioLetras2.classList.add("cambioLetra");
    imagenJ2.classList.remove("win");

    imagenJ1.src = "./img/play.png";
    imagenJ1.classList.remove("wait");
    cambioLetras1.classList.remove("cambioLetra");
    imagenJ1.classList.remove("win");
  } else {
    imagenJ1.src = "./img/wait.png";
    imagenJ1.classList.add("wait");
    cambioLetras1.classList.add("cambioLetra");
    imagenJ1.classList.remove("win");

    imagenJ2.src = "./img/play.png";
    imagenJ2.classList.remove("wait");
    cambioLetras2.classList.remove("cambioLetra");
    imagenJ2.classList.remove("win");
  };
};

function nuevoJuego() {
  reiniciarJ();
  reiniciarJuego();
  
  const reinicioPuntos1 = document.getElementById("puntosj1");
  const reinicioPuntos2 = document.getElementById("puntosj2");
  marcadoro = 0;
  marcadorx = 0;
  reinicioPuntos1.innerText = 0;
  reinicioPuntos2.innerText = 0;
 
  const modalConteiner = document.querySelectorAll(".animacion")[0];
  modalConteiner.classList.remove("ocultarModal");
  };
