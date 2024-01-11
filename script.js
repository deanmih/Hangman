let words = ["car", "mountain", "javascript", "Alabama"];
let engLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";; 
let chosenWord, chosenPosition;

function randomizeWord() {
    chosenPosition = Math.floor(Math.random() * words.length);
    chosenWord = words[chosenPosition].toString().toUpperCase();
    
    let hpText = document.createElement("div");
    hpText.style.background = "white";
    hpText.style.height = "30px";
    hpText.style.marginTop = "5%";
    hpText.style.marginLeft = "1%";
    hpText.style.marginRight = "1%";
    hpText.style.width = "400px";
    hpText.innerText = "Your HP Points";
    hpText.style.textAlign = "center";
    hpText.style.verticalAlign = "middle";
    hpText.style.lineHeight = "30px";
    hpText.style.fontFamily = "Georgia";
    document.body.appendChild(hpText);
    
    let showHp = document.createElement("div");
    showHp.style.background = "white";
    showHp.style.height = "70px";
    showHp.style.marginTop = "1%";
    showHp.style.marginLeft = "1%";
    showHp.style.marginRight = "1%";
    showHp.style.width = "400px";
    showHp.innerText = hpPts;
    showHp.style.textAlign = "center";
    showHp.style.verticalAlign = "middle";
    showHp.style.lineHeight = "70px";
    showHp.style.fontFamily = "Georgia";
    showHp.style.fontSize = "50px";
    showHp.id = "hpPts";
    document.body.appendChild(showHp);
    
    let instructionsTxt = document.createElement("div");
    instructionsTxt.style.background = "white";
    instructionsTxt.style.height = "30px";
    instructionsTxt.innerText = "Pick Letters To Form Your Word";
    instructionsTxt.style.textAlign = "center";
    instructionsTxt.style.verticalAlign = "middle";
    instructionsTxt.style.lineHeight = "30px";
    instructionsTxt.style.fontFamily = "Georgia";
    instructionsTxt.style.marginTop = "5%";
    document.body.appendChild(instructionsTxt);

    for (let i = 0; i < 26; ++i) { 
        let pickLetterBtn = document.createElement("button");
        pickLetterBtn.innerHTML = engLetters[i];
        pickLetterBtn.id = engLetters[i];
        pickLetterBtn.style.background = "white";
        pickLetterBtn.style.marginLeft = "1%";
        pickLetterBtn.style.marginTop = "1%";
        document.body.appendChild(pickLetterBtn);
        pickLetterBtn.addEventListener("click", checkForLetter);
    }

    document.body.appendChild(document.createElement("div"));
    for (let i = 0; i < chosenWord.length; ++i) { 
        let wordLetterBtn = document.createElement("button");
        wordLetterBtn.style.background = "white";
        wordLetterBtn.style.height = "80px";
        wordLetterBtn.style.width = "50px"; 
        wordLetterBtn.style.marginLeft = "1%";
        wordLetterBtn.style.marginTop = "1%";
        wordLetterBtn.disabled = true;
        wordLetterBtn.innerText = "_";
        wordLetterBtn.id = i;
        wordLetterBtn.style.fontSize = "50px";
        wordLetterBtn.style.color = "black";
        document.body.appendChild(wordLetterBtn);
    }
}

let hpPts = 7, letterMatches = 0;
function checkForLetter() {
    for (let i = 0; chosenWord.includes(this.id) == true && i < chosenWord.length; ++i) {
        if (this.id == chosenWord[i]) {
            document.getElementById(i).innerText = chosenWord[i];
            ++letterMatches;
        }
    }
    if (chosenWord.includes(this.id) == false && hpPts > 0) {
        --hpPts;
        document.getElementById("hpPts").innerText = hpPts;
    } 
    document.getElementById(this.id).remove();
    let discardedLetter = this.id;
    engLetters = engLetters.split(discardedLetter).join('');
    
    let lossIndex = 0;
    let winIndex = 0;
    if (hpPts == 0 && letterMatches < chosenWord.length) {
        let loseMessage = document.createElement("div");
        loseMessage.style.background = "white";
        loseMessage.style.marginTop = "1%";
        loseMessage.style.marginLeft = "1%";
        loseMessage.style.height = "80px";
        loseMessage.style.width = "300px";
        loseMessage.innerText = "You Lost!";
        loseMessage.style.fontSize = "40px";
        loseMessage.style.textAlign = "center";
        loseMessage.style.verticalAlign = "middle";
        loseMessage.style.lineHeight = "80px";
        loseMessage.style.fontFamily = "Georgia";
        document.body.appendChild(loseMessage);
        ++lossIndex;
    } 
    if (letterMatches == chosenWord.length) {
        let winMessage = document.createElement("div");
        winMessage.style.background = "white";
        winMessage.style.marginTop = "1%";
        winMessage.style.marginLeft = "1%";
        winMessage.style.height = "80px";
        winMessage.style.width = "300px";
        winMessage.innerText = "You Won!";
        winMessage.style.fontSize = "40px";
        winMessage.style.textAlign = "center";
        winMessage.style.verticalAlign = "middle";
        winMessage.style.lineHeight = "80px";
        winMessage.style.fontFamily = "Georgia";
        document.body.appendChild(winMessage);
        ++winIndex;
    }
    if (hpPts == 0 || letterMatches == chosenWord.length) {
        let gameRestartBtn = document.createElement("button");
        gameRestartBtn.style.background = "white";
        gameRestartBtn.style.marginLeft = "1%";
        gameRestartBtn.style.marginTop = "1%";
        gameRestartBtn.style.height = "30px";
        gameRestartBtn.style.width = "300px";
        gameRestartBtn.innerText = "Reset Game";
        gameRestartBtn.style.color = "black";
        gameRestartBtn.style.fontFamily = "Georgia";
        gameRestartBtn.addEventListener("click", refreshGame);
        document.body.appendChild(gameRestartBtn);
    }
    for (let i = 0; winIndex == 1 && i < engLetters.length || lossIndex == 1 && i < engLetters.length; ++i) {
        document.getElementById(engLetters[i]).disabled = true;
    }
    document.getElementById("generateGame").disabled = true;
}

function refreshGame() {
    location.reload();    
}
