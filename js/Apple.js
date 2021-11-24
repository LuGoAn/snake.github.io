import Entity from './Entity.js'
import Vector2 from "./Vector2.js"

/**
 * @export
 * @class Apple Objet reprensentant la pomme que mange le serpent
 * @extends {Entity}
 */
export default class Apple extends Entity {
    /**
     * @param {any} context Contexte 2D dans lequel le jeu sera affiché
     * @param {number} cell Represente une cellule de 20px*20px du terrain de jeu
     * @param {string} color couleur de la pomme
     * @return {Apple} retourne une instance de la classe Apple
     */
    constructor(context, cell, color) {
        super(context, cell)

        this.pos.move(Math.floor(Math.random() * this.cell)*this.cell, //Definie une position aléatoire par défaut a la pomme
                      Math.floor(Math.random() * this.cell)*this.cell)

        this.color = color
    }

    /**
     * Affiche la pomme, un cercle rouge
     * @return {void}
     * @memberOf Apple
     */
    draw () {
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x+(this.cell/2), 
                    this.pos.y+(this.cell/2), 
                    this.cell/2, 0, 360)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
  
    }
}