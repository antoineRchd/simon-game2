import {SimonGame} from "./game.js"

class Display{
    constructor(){
        this.SimonGame = new SimonGame()
        this.buttons = Array.from(document.getElementsByClassName("game-btn"))
        this.resetButton = document.getElementById("reset-btn")
        this.round = document.getElementById("round")
        this.buttonStart = document.getElementById("start-btn")
        this.leJeuEstEnCours = false
        this.round.innerText = this.SimonGame.round+1
        this.main()

        this.colorOn=[
            "#ff000070",
            "#00800070",
            "#ffff0070",
            "#0000ff70"
        ]
        this.colorOff=[
            "#ff0000",
            "#008000",
            "#ffff00",
            "#0000ff"
        ]
    } 
    main(){
        this.buttons.forEach( (button, i)=>{
            button.addEventListener('click',e=>{
                if(!this.leJeuEstEnCours){
                    this.activeCouleur(i)
                    this.SimonGame.AjoutCouleurJoueurSequence(i)
                    if(!this.SimonGame.laCouleurChoisiEstBonne()){
                        this.SimonGame.swapLectureEcriture()
                        this.SimonGame.resetLejeuPourUtilisateur()
                        this.joueurCestTromper()
                    }
                }
            })
        })
        this.resetButton.addEventListener("click",()=>{
            this.resetLeJeu()
        })
        this.buttonStart.addEventListener("click",()=>{
            this.sequenceDeJeu()
        })
        return true
    }
    resetLeJeu(){
        this.round.innerText = this.SimonGame.round+1
        document.getElementById("fail").innerHTML = "";
    }
    sequenceDeJeu(){
        if(this.isUserTurn){
            return
        }
        this.SimonGame.creeSequence()
        this.SimonGame.swapLectureEcriture()
        this.leJeuEstEnCours=true
        let indexToPlay=0
        const id = setInterval(()=>{
            if( indexToPlay < this.SimonGame.sequence.length ){
                this.activeCouleur( this.SimonGame.sequence[indexToPlay] )
            }else{
                clearInterval(id)
                this.leJeuEstEnCours=false
            }
            indexToPlay++
            }, 500 )
    }
    activeCouleur(colorIndex){
        this.buttons[colorIndex].style.backgroundColor=this.colorOn[colorIndex]
        setTimeout(()=>{
            this.buttons[colorIndex].style.backgroundColor=this.colorOff[colorIndex]
        },200)
    }
    ToutLesCouleurDesactiver(){
        this.buttons.forEach((button,i)=>{
            button.style.backgroundColor=this.colorOff[i]
        })
    }
    joueurCestTromper(){
        document.getElementById("fail").innerHTML = "mauvaise réponse";
    }
}

export { Display }