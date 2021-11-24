import UI from './UI.js'
import Entity from './Entity.js'
import Vector2 from './Vector2.js'

/**
 * @export 
 * @class Snake Objet representant le joueur
 * @extends {Entity} Hérite des propriétées de la classe Entity
 */
export default class Snake extends Entity {
    /**
     *
     * @param {any} context Contexte 2D dans lequel le jeu sera affiché
     * @param {number} cell Represente une cellule de 20px*20px du terrain de jeu
     * @param {number} x Position en x 
     * @param {number} y Position en y
     * @param {string} color Couleur du serpent
     * @return {Snake} retourne un objet de type Snake, un instance de la classe Snake
     */
    constructor (context, cell,  x, y, color) {
        super(context, cell, x, y)

        this.vel = new Vector2() //Créer un vecteur 2D
        this.color = color
        this.tailLength = 5 //Longeur du serpent par défaut
        this.tail = [] //Tableau de vecteur 2D representant les positions des queues du serpent
        this.exp = 0 //Points d'exp par défaut
        this.lvl = 1 //Niveau par défaut

        this.speed = new Event('speed') //Evenement pour modifier la vitesse du jeu
        this.death = new Event('death') //Evenement pour signifier le gameover, et donc arreter totalement le refraichissement du jeu
    }
    /**
     * Affiche tout les éléments graphiques composant le serpent
     * @return {void}
     * @memberOf Snake
     */
    draw () {
        /**Affichela tête du serpent, un cercle vert */
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x+(this.cell/2), 
                    this.pos.y+(this.cell/2), 
                    this.cell/2-1, 0, 360)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = '#e7e7e7e7'
        this.ctx.stroke()

        /**Affiche toutes les queues du serpent, des cercles verts plus ou moins grand */
        this.tail.forEach((t, i) => {
                this.ctx.beginPath()
                this.ctx.arc(t.x+(this.cell/2), 
                            t.y+(this.cell/2), 
                            this.cell/2-(i%3*2), 0, 360)
                this.ctx.fillStyle = this.color
                this.ctx.fill()
                if(Vector2.isEqual(this.pos, t)) { // Vérifie si le serpent se mange la queue 
                    this.stop() //Arret total du serpent
                    UI.game.dispatchEvent(this.death) //Déclenchement de l'evenement gameover
                    UI.gameover.style.display = "block" //Affichage de l'element d'interface de gameover
                    new Audio('./ressources/youdied.mp3').play() //Jingle gameover
                    setTimeout(()=>window.location='/',7500) //Après 7.5s, rechargement de la page
                }
        })
        /**Vérifie si le joueur a commencer a jouer (evite un conflit avec la vérification du mordage de queue),
         * dans ce cas là, le traitement des queues du serpent peut commencer.
         */
        if(this.vel.x !== 0 ||
            this.vel.y !== 0) {
            this.tail.push(new Vector2(this.pos.x,this.pos.y))
            while(this.tail.length > this.tailLength){
            this.tail.shift()
            }
        }
    }

    /**
     * 
     * Comportement du serpent qui mange une pomme
     * @param {Apple} apple 
     * @return {void}
     * 
     * @memberOf Snake
     */
    eat (apple) {
        /**Vérifie si la tete du serpent et une pomme sont sur la même cellule */
        if(Vector2.isEqual(this.pos, apple.pos)) { 
            this.exp += 33 //Gain d'expérience
            new Audio('./ressources/exp.mp3').play() //Jingle de gain d'experience
            UI.game.dispatchEvent(this.speed)
            /**Vérifie s'il y a un level up */
            if(this.exp >= 100) {
                this.lvl += 1 //Gain de niveau
                this.exp -=100 //Réinitialisation de l'expérience
                new Audio('./ressources/lvlup.mp3').play() //Hingle de gain de niveau
            }
            this.tailLength += 1 //Gain de la taille de queue
            apple.pos.move(Math.floor(Math.random() * this.cell)*this.cell, //Change la position de la pomme aléatoirement
                            Math.floor(Math.random() * this.cell)*this.cell) 
        }
    }

    /**
     * Comportement effectué 60 fois par seconde 
     * @return {void}
     * @memberOf Snake
     */
    update () {
         /**
          * Ajoute la valeur de velocity a la position, 
          * permet de faire bouger le serpent car executé 60 fois par seconde
          */
        this.pos.move(this.pos.x+this.vel.x*this.cell,
                    this.pos.y + this.vel.y * this.cell)
        /**
         * Logique permettant de faire réapparaitre le serpent 
         * de l'autre côté du terrain de jeu lorsqu'il en sort
         * */
        if(this.pos.x < 0) this.pos.x = this.cell*this.cell-this.cell
        if(this.pos.x > this.cell*this.cell-this.cell) this.pos.x = 0
        if(this.pos.y < 0) this.pos.y = this.cell*this.cell-this.cell
        if(this.pos.y > this.cell*this.cell-this.cell) this.pos.y = 0 
    }

    /**
     * 
     * Arrête tout mouvement du serpent en réinitialisant sa vélocité
     * @return {void}
     * @memberOf Snake
     */
    stop () {
        this.vel.move(0,0)
    }
}