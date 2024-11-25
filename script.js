let winResult = {
  Player: 0,
  Computer: 0,
  Tie: 0,
};

const rockImg =
  "https://s3-alpha-sig.figma.com/img/e2f5/14e9/7d8f1b87d406a7bced07190e2c368075?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZavZ3xhFdKKko5ziUOWGehQfZu0F0M0~7aXOgP1GB8tuEra3NeILLk~F5ekMdQXT60m1f5560yMw~rMG36Vkbb0zGWLOBlV52pkcvP5Olwffu3OKZoyY5~Zj1n5zh1LvnuODQAl8Bwnge4JOUNBZFvjRKPOkP9VRD4bwdbmPL2V6d-xSz7-iqjG9bQ0W1FWNmkG7xsPeh3IFDdjo58sA9ScH7dRZWULXbs1UAcYjA2VSQZMgWw5FmGch62OIHv7UsqUDO8iHQr6YUdBFYXY26e5NpdmGUSWWgLa4n~w5CXFCER8kDwtHOylyldDJgPJPucCxW0NlRRE6-RVByjk4SQ__";
const paperImg =
  "https://s3-alpha-sig.figma.com/img/9e58/4d5f/879bf162796082bc4c606349436e0c52?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y~KLHI9gIfEErE85fz2EwPspTn-6vnLLZsc-AA4P8T80ASuLbs1yxRp7tz0h7hrTXtBGzZW8vve0DrnNo8WnlXc2-Os9wdcbc5~0SoCHnBfdMC8Vmv7zcluCHzkRCCoyA0B8wOro9stIYgVdWBOprNcG7NCuCSmOH-y7Jlf8kMBiifnbwA6xnpL-dmPZOzorzUjiQnA03RHz69f5iHeCnwonIeJMGi4S2YAUJOOiZEM5ODpge6IqZV-elKMC3LbOqh~aSrj~1PT9scXuw8mf2pN5LtDh-3Pvul2zIQaCR9hexsi-E9GT7i6d4zA7PbxuAbDS380oScmx2m34l8ErMw__";
const scissorsImg =
  "https://s3-alpha-sig.figma.com/img/388b/63da/8e9ba336eea3ea7f107fc48755a6b68d?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MNaWN65uWhRHEO1hGTftGTjKaODjAenVsy3SVQm9F1Q8KEFbAGI0d3EmQjosRvTTNmUBXSYfwGkds48ja510F4-hJWP8nBU90hcMXEXOoson1pQNGrxjAAU6KBkyaxBDPhnqzJZqsCDiCGMVjbsNjealWCn8NhenCBOEyIOSZcys~NbARGSkVlGSNipYmNzEasYWVFTk2gUU2QamIZ-6vSUbZf69NNx4gc4x7NSoZl8R-Ob~Fo8O-P9NZDcSDvrsXGbdvLycK8JWZgVzdtHhycB-y5bJ6YE~bYXNxsXMswo6oQ8vsKoTVb5PSBEG7lirjnXcDEHqc--6fyHpAszjwg__";

const rock = document.querySelector("#rock>a");
const availableOptions = ["rock", "paper", "scissors"];
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

loadScores();

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  let winner = getWinner(userChoice, computerChoice);
  if (winner !== "Tie") {
    winner === "Player" ? (winResult.Player += 1) : (winResult.Computer += 1);
    updateResult(userChoice, computerChoice, winner);
  } else {
    winResult.Tie += 1;
    updateResult(userChoice, computerChoice, winner);
  }
  console.log(winner);
  saveResultsToLocalStorage();
  loadScores();
}

function saveResultsToLocalStorage() {
  // console.log('store to local storage');

  localStorage.setItem("winResult", JSON.stringify(winResult));
}

function loadScores() {
  const storedResults = localStorage.getItem("winResult");
  if (storedResults) {
    winResult = JSON.parse(storedResults);
    // console.log(winResult);
  }

  playerScore.textContent = winResult.Player;
  computerScore.textContent = winResult.Computer;
}

function getComputerChoice() {
  return availableOptions[Math.floor(Math.random() * availableOptions.length)];
}

function getWinner(player, computer) {
  // console.log(player, computer);

  if (player === computer) {
    return "Tie";
  }
  if (player === "rock" && computer === "scissors") {
    return "Player";
  }
  if (player === "rock" && computer === "paper") {
    return "Computer";
  }
  if (player === "paper" && computer === "scissors") {
    return "Computer";
  }
  if (player === "paper" && computer === "rock") {
    return "Player";
  }
  if (player === "scissors" && computer === "rock") {
    return "Computer";
  }
  if (player === "scissors" && computer === "paper") {
    return "Player";
  }
}

function updateResult(playerChoice, computerChoice, winner) {
  const resultElement = document.getElementById("game-container");
  let playerImage, computerImage;

  if (playerChoice === "rock") {
    playerImage = rockImg;
  } else if (playerChoice === "paper") {
    playerImage = paperImg;
  } else if (playerChoice === "scissors") {
    playerImage = scissorsImg;
  }

  if (computerChoice === "rock") {
    computerImage = rockImg;
  } else if (computerChoice === "paper") {
    computerImage = paperImg;
  } else if (computerChoice === "scissors") {
    computerImage = scissorsImg;
  }

  let resultMessage = "";
  let buttonText = "PLAY AGAIN";
  if (winner === "Player") {
    const nextButton = document.createElement("a");
    nextButton.textContent = "NEXT";
    nextButton.href = "result.html";
    document.querySelector(".button-container").appendChild(nextButton);
    resultMessage = `<h2>YOU WIN</h2><h3>AGAINST PC</h3>`;
  } else if (winner === "Computer") {
    resultMessage = `<h2>YOU LOST</h2><h3>AGAINST PC</h3>`;
  } else {
    resultMessage = `<h2>TIE UP</h2>`;
    buttonText = "REPLAY";
  }
  // resultElement.classList.add('winner-animation');

  resultElement.innerHTML = `<div id="${playerChoice}">
                <p id="pick">YOU PICKED</p>
                <div>
                    <a href="#">
                        <img class = "${winner==='Player'?'winner-animation':''}" src="${playerImage}" alt="${playerImage}">
                    </a>
                </div>
            </div>
            <div id="game-result">
                <div>
                    ${resultMessage}
                </div>
                <a href="#" onclick= location.reload()>
                    ${buttonText}
                </a>
            </div>
            <div id="${computerChoice}">
            <p id="pick">PC PICKED</p> 
                <a href="#">
                    <img class = "${winner==='Computer'?'winner-animation':''}" src="${computerImage}" alt="scissors">
                </a>
            </div>`;
}
function resetScores() {
  winResult.Player = 0;
  winResult.Computer = 0;
  winResult.Tie = 0;
  saveResultsToLocalStorage();
}

function openModal() {
  document.getElementById("rules-modal").style.display = "block";
}
function closeModal() {
  document.getElementById("rules-modal").style.display = "none";
}

document.querySelector("#rules").addEventListener("click", (event) => {
  event.preventDefault();
  openModal();
});
