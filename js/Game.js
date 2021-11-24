import UI from './UI.js'
import Snake from './Snake.js'
import Apple from './Apple.js'

let canvas = UI.game //terrain de jeu
let context = canvas.getContext("2d") //contexte 2D, oiur afficher des elements graphiques en 2D

let cell = Math.sqrt(canvas.height) //taille d'une cellule du terrain de jeu

let snake = new Snake(context, cell, 0, 0, "#8BC34A") //le joueur
let apple = new Apple(context, cell, "#B71C1C") //une pomme

let refreshRate = 60 //taux de rafraichissement par défaut, un rafraichissement toutes les 60ms
let game = setInterval(update, refreshRate) //Boucle de rafraichissement du jeu, execute la function update toute les 60ms

/**Ecoute de l'evenement déclenché par le serpent, qui modifie la vitesse du jeu (le taux de rafraichissement) */
canvas.addEventListener('speed', (e) => { 
    clearInterval(game)
    refreshRate = 60 - ((snake.lvl-1)*5)
    game = setInterval(update, refreshRate) //réassignation de la variable game avec la nouvel boucle de rafraichissement avec le taux mis a jour
})

canvas.addEventListener('death', () => clearInterval(game)) //Ecoute de l'evenement death qui stoppe completement la boucle de rafraichissement

document.addEventListener("keydown", keyboardInput) //Ecoute de l'evenement de touche préssé au clavier, lance la fonction keyboardInput a chaque appel

/**
 * Affiche les éléments du jeu
 * @return {void}
 */
function draw() {
    context.fillStyle = "#212121" // couleur du terrain de jeu
    context.fillRect(0,0, 400, 400) // taille du terrain de jeu
    snake.draw() //affiche le joueur
    apple.draw() //affiche la pomme
}

/**
 * Executé toutes les 60ms
 * @return {void}
 */
function update() { 
    draw() //affiche les elements du jeu
    snake.eat(apple) //vérifie en permanence si le joueur mange une pomme
    snake.update() //met a jour le comportement du serpent

    UI.lvl.textContent = snake.lvl //modifie le texte d'interface du niveau
    UI.exp_bar.value = snake.exp //modifie la valeur de la barre d'expérience
    UI.exp.textContent = `${snake.exp}%` //modifie le texte d'interface du pourcentage d'exp
}

/**
 * Executé a chaque appui de touche par le joueur
 * @param {KeyboardInput} e Détail de la touche préssée
 */
function keyboardInput(e) {
    switch(e.key) {
        case "w":
        case "W":
            snake.vel.move(0,-1) //va en haut
        break
        case "a":
        case "A":
            snake.vel.move(-1,0) //va a gauche
        break
        case "s":
        case "S":
            snake.vel.move(0,1) //en bas
        break
        case "RIGHT":
            snake.vel.move(1,0) //a droite
        break

    }
}

