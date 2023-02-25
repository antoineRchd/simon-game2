class SimonGame {
  constructor() {
    this.sequenceLength = [2, 3, 4, 5, 6];
    this.sequence = [];
    this.userSequence = [];
    this.isUserTurn = false;
    this.round = 0;
  }

  creeSequence = () => {
    const lsColorSequence = [];
    const nbColors =  this.sequenceLength[this.round];
    for (let i = 0; i < nbColors; i++) {
      lsColorSequence.push(Math.floor(Math.random() * 4));
    }
    this.sequence = lsColorSequence;
  };

  AjoutCouleurJoueurSequence(i) {
    this.userSequence.push(i);
    if (this.userSequence.length === this.sequence.length) {
      this.sequence = [];
      this.userSequence = [];
      this.isUserTurn = false;
    }
  }

  swapLectureEcriture() {
    this.isUserTurn = !this.isUserTurn;
  }

  SequenceJeuEtJoueurIdentique() {
    let isEqual = true;
    this.sequence.forEach((buttonIndex, i) => {
      if (buttonIndex != this.userSequence[i]) {
        isEqual = false;
      }
    });
    if (isEqual) {
      this.round += 1;
    }
    return isEqual;
  }

  laCouleurChoisiEstBonne() {
    if(!Array.isArray(this.userSequence) || !Array.isArray(this.sequence)){
        return null
    }
    return (
      this.userSequence[this.userSequence.length - 1] ===
      this.sequence[this.userSequence.length - 1]
    );
  }

  resetLejeuPourUtilisateur() {
    this.userSequence = [];
  }
}

export { SimonGame };
