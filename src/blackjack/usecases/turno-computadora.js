import { pedirCarta, valorCarta, crearCartaHTML } from "./";

/**
 * Turno de la computadora
 * @param {Number} puntosMinimos que la computadora necesita para ganar 
 * @param {HTMLElement} puntosHTML elemento HTML para mostrar los puntos
 * @param {HTMLElement} divCartasComputadora Elemento HTML para mostrar las cartas
 * @param {Array<String>} deck 
 * @returns {Void}
 */

// Referencia
const divCartasJugadores = document.querySelectorAll('.divCartas'),
      divWinningMessage  = document.querySelector('#winning-message'),
      winningMessage = {
                        jugador: 'Jugador gana',
                        computadora: 'La computadora gana',
                        nadie: 'Nadie gana...'
                    };

export const turnoComputadora = ( puntosMinimos, puntosHTML, divCartasComputadora, deck = [] ) => {

    if( !puntosMinimos ) throw new Error('Los puntosMinimos son necesarios');
    if( !puntosHTML ) throw new Error('Argumento puntosHTML es necesario');

    let puntosComputadora = 0;

    do {
        const carta = pedirCarta( deck );

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML.innerText = puntosComputadora;
        
        const imgCarta = crearCartaHTML( carta );
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    const divCartasOne = divCartasJugadores[0].querySelectorAll('img'),
          divCartasTwo = divCartasJugadores[1].querySelectorAll('img');

    setTimeout(() => {
        
        divWinningMessage.style.opacity = 1;

       if( puntosComputadora === puntosMinimos){
            if(divCartasOne.length < divCartasTwo.length){
                
                divWinningMessage.innerHTML = `<p>${winningMessage.jugador}</p>`; 

            }else if(divCartasOne.length > divCartasTwo.length){

                divWinningMessage.innerHTML = `<p>${winningMessage.computadora}</p>`; 
               
            }else {

                divWinningMessage.innerHTML = `<p>${winningMessage.nadie}</p>`; 
               
            };
            
        }else if(puntosMinimos > 21){

            divWinningMessage.innerHTML = `<p>${winningMessage.computadora}</p>`; 
           
        }else if(puntosComputadora > 21){

            divWinningMessage.innerHTML = `<p>${winningMessage.jugador}</p>`; 
           
        }else {

            divWinningMessage.innerHTML = `<p>${winningMessage.computadora}</p>`;
            
        };
        
    }, 300 );
}

