import Vector2 from "./Vector2.js"

/**
 * @export
 * @class Entity Objet par défaut qui oriente le comportement des classes qui en héritera
 */
export default class Entity {
    /**
     * @param {any} context Contexte 2D dans lequel le jeu sera affiché
     * @param {number} cell Represente une cellule de 20px*20px du terrain de jeu
     * @param {number} [x=0] 
     * @param {number} [y=0] 
     */
    constructor (context, cell, x=0, y=0) {
        this.ctx = context
        this.cell = cell
        this.pos = new Vector2(x * this.cell ,y * this.cell)
    }
}