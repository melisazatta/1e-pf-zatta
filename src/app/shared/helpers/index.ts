//Funcion token
export function generarStringRandom(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let resultado = '';

    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indice);
    }
    return resultado;
}

//Funcion Id

export function generarRandomId(): number{
    const idLength = 0;
    const randomIdString = generarStringRandom(idLength)

const randomId = parseInt(randomIdString, 10);

return randomId;

}