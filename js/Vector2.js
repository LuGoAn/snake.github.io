/**
 * @export
 * @class Vector2 Permet de créer un vecteur 2D
 */
export default class Vector2 {
    /**
     * @param {number} [x=0] position en x
     * @param {number} [y=0] position en y
     * @return {Vector2} retourne une instance de la classe Vector2
     */
    constructor (x=0,y=0 ){
        this.move(x,y)
    }
    
    /**
     * Change les valeurs de x et y
     * @param {any} x 
     * @param {any} y 
     * @return {void}
     * @memberOf Vector2
     */
    move (x,y) {
        this.x = x
        this.y = y
    }

    /**
     * Vérifie si deux vecteurs ont les mêmes valeurs en x et y
     * @static ne peut pas être appelé depuis une instance de la classe, seulement en explicitant le nom de la classe eg: Vector2.isEqual()
     * @param {any} vec 
     * @param {any} vec2 
     * @return {bool}
     * @memberOf Vector2
     */
    static isEqual (vec, vec2) {
        return vec2.x === vec.x &&
                vec2.y === vec.y
    }
}


