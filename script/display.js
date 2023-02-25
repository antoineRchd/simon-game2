import {SimonGame} from "./game.js"

class Display{
    constructor(){
        this.SimonGame = new SimonGame()
        this.buttons = Array.from(document.getElementsByClassName("game-btn"))
        this.resetButton = document.getElementById("reset-btn")
        this.levelIndicator = document.getElementById("round")
        this.playButton = document.getElementById("start-btn")
        this.isSequenceBeingPlayed = false
        this.levelIndicator.innerText = this.SimonGame.round+1
        this.attachEvents()

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
    attachEvents(){
        this.buttons.forEach( (button, i)=>{
            button.addEventListener('click',e=>{
                if(!this.isSequenceBeingPlayed){
                    this.turnColorOnWithIndex(i)
                    this.SimonGame.addNewValueToTheUserSequence(i)
                    if(!this.SimonGame.isTheLastSequenceElementGood()){
                        this.SimonGame.alternateReadWriteMode()
                        this.SimonGame.resetUserSequence()
                        this.showSequenceIsFalse()
                    }
                }
            })
        })
        this.resetButton.addEventListener("click",()=>{
            this.resetGame()
        })
        this.playButton.addEventListener("click",()=>{
            this.playSequence()
        })
        return true
    }
    resetGame(){
        this.levelIndicator.innerText = this.SimonGame.round+1
        document.getElementById("fail").innerHTML = "";
    }
    playSequence(){
        if(this.isUserTurn){
            return
        }
        this.SimonGame.createNewSequence()
        this.SimonGame.alternateReadWriteMode()
        this.isSequenceBeingPlayed=true
        let indexToPlay=0
        const id = setInterval(()=>{
            if( indexToPlay < this.SimonGame.sequence.length ){
                this.turnColorOnWithIndex( this.SimonGame.sequence[indexToPlay] )
            }else{
                clearInterval(id)
                this.isSequenceBeingPlayed=false
            }
            indexToPlay++
            }, 500 )
    }
    turnColorOnWithIndex(colorIndex){
        this.buttons[colorIndex].style.backgroundColor=this.colorOn[colorIndex]
        setTimeout(()=>{
            this.buttons[colorIndex].style.backgroundColor=this.colorOff[colorIndex]
        },200)
    }
    turnEveryColorsOff(){
        this.buttons.forEach((button,i)=>{
            button.style.backgroundColor=this.colorOff[i]
        })
    }
    showSequenceIsFalse(){
        document.getElementById("fail").innerHTML = "mauvaise réponse";
    }
}

export { Display }