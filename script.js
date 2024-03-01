const gameBoard = function () {

    const gameBoardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const returnGameBoard = function () {
        return gameBoardArray;
    }

    return { returnGameBoard };
}();

const gameEngine = function (gameBoardArray = gameBoard.returnGameBoard()) {

    let gameStatus;

    const markGameBoard = function (outerIndex, innerIndex, playerSymbol) {
        gameBoardArray[outerIndex][innerIndex] = playerSymbol;
        alertWinOrDraw(playerSymbol);
    };

    const checkWinOrDraw = function (playerSymbol) {
        let win = false;
        let emptySquarePresent;

        function checkHorizontally() {
            let symbolCount = 0;

            gameBoardArray.forEach((item) => {
                for (let i = 0; i < 3; i++) {
                    if (item[i] === playerSymbol)
                        symbolCount++
                }

                symbolCount === 3 ? win = true : symbolCount = 0;
            })
        }

        function checkVertically() {
            /*here j is the outer index and i is the inner index because 
            we need the inner index to remain same while outer index changes in the inner loop*/
            let symbolCount = 0;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gameBoardArray[j][i] === playerSymbol)
                        symbolCount++
                }

                symbolCount === 3 ? win = true : symbolCount = 0;
            }
        }

        function checkDiagonally() {
            let symbolCount = 0;

            for (let i = 0; i < 3; i++) {
                if (gameBoardArray[i][i] === playerSymbol)
                    symbolCount++
            }

            symbolCount === 3 ? win = true : symbolCount = 0;

            for (let i = 0; i < 3; i++) {
                let j = 2 - i;
                if (gameBoardArray[i][j] === playerSymbol)
                    symbolCount++
            }

            symbolCount === 3 ? win = true : symbolCount = 0;
        }

        function checkEmptySquare() {
            for (let i = 0; i < 3; i++) {
                if (gameBoardArray[i].includes("")) {
                    emptySquarePresent = true;
                    break;
                }

                else
                    emptySquarePresent = false;
            }
        }

        checkHorizontally();
        checkVertically();
        checkDiagonally();
        checkEmptySquare();

        return { win, emptySquarePresent }
    }

    const alertWinOrDraw = function (playerSymbol) {
        const winner = playerSymbol === "X" ? Players.player1.name : Players.player2.name;

        if (checkWinOrDraw(playerSymbol).win === true) {
            domReference.gameResult.textContent = `${winner} won!`;

            gameEngine.gameStatus = "Win";
            resetGameBoard();
        }

        else if (checkWinOrDraw(playerSymbol).emptySquarePresent === false) {
            domReference.gameResult.textContent = "Draw!";

            gameEngine.gameStatus = "Draw";
            resetGameBoard();
        }

        return gameStatus;
    }

    const resetGameBoard = function () {
        gameBoardArray.forEach((item) => {
            item[0] = "";
            item[1] = "";
            item[2] = "";
        })
    }

    return { markGameBoard, alertWinOrDraw, gameStatus, resetGameBoard };
}();

const domReference = function () {
    let gameBoardDOMArray = Array.from(document.querySelectorAll(".gameBoard"));
    gameBoardDOMArray = [gameBoardDOMArray.slice(0, 3), gameBoardDOMArray.slice(3, 6), gameBoardDOMArray.slice(6)];

    let playerInputDOM = Array.from(document.querySelectorAll("input"));
    let changeNameButtonDOM = Array.from(document.querySelectorAll(".changeName"));
    let playAgainButton = document.querySelector(".playAgain");

    let gameResult = document.querySelector(".gameResult");

    return { gameBoardDOMArray, playerInputDOM, changeNameButtonDOM, playAgainButton, gameResult }
}();

const Players = function () {

    const CreatePlayer = function (name, playerSymbol, defaultName) {
        if (name.trim() === "")
            name = defaultName
        return { name, playerSymbol };
    };

    const player1 = CreatePlayer("", "X", "player1");
    const player2 = CreatePlayer("", "O", "player2");

    const changePlayerName = function () {
        const player1button = domReference.changeNameButtonDOM[0];
        const player2button = domReference.changeNameButtonDOM[1];
        const player1Input = domReference.playerInputDOM[0];
        const player2Input = domReference.playerInputDOM[1];

        function buttonAddEventListener(index) {
            let input = domReference.playerInputDOM[index];
            input.disabled ? input.disabled = false : input.disabled = true;
            input.focus();
        }

        player1button.addEventListener("click", () => buttonAddEventListener(0))
        player2button.addEventListener("click", () => buttonAddEventListener(1))

        function inputAddEventListener(index, player) {
            let input = domReference.playerInputDOM[index];

            if (input.value.trim() !== "")
                player["name"] = input.value;

            input.disabled = true;
            input.value = "";
            printPlayerName();
        }

        player1Input.addEventListener("change", () => inputAddEventListener(0, player1))
        player2Input.addEventListener("change", () => inputAddEventListener(1, player2))
    }();

    const printPlayerName = function () {
        const player1Input = domReference.playerInputDOM[0];
        const player2Input = domReference.playerInputDOM[1];

        player1Input.setAttribute("placeholder", player1.name);
        player2Input.setAttribute("placeholder", player2.name);
    };

    printPlayerName();

    return { player1, player2 };
}();

const playGame = function () {
    let currentPlayer = Players.player1;
    let gameBoardSquares = domReference.gameBoardDOMArray;
    let playAgainButton = domReference.playAgainButton;

    gameBoardSquares.forEach((item) => {
        item.forEach((element) => {
            element.addEventListener("click", (event) => {
                if (event.target.textContent !== "X" && event.target.textContent !== "O"
                    && gameEngine.gameStatus !== "Win") {
                    let symbol = currentPlayer.playerSymbol;

                    event.target.textContent = symbol;

                    gameEngine.markGameBoard(getIndices(event)[0], getIndices(event)[1], symbol);
                    
                    
                    gameEngine.alertWinOrDraw(symbol);

                    currentPlayer = currentPlayer === Players.player1 ? Players.player2 : Players.player1;

                    printPlayerTurn();
                }
            })
        })
    });

    const getIndices = function (event) {
        let outerIndex;
        let innerIndex;

        gameBoardSquares.forEach((item, index) => item.includes(event.target) ? outerIndex = index : "null");

        innerIndex = gameBoardSquares[outerIndex].findIndex((item) => item === event.target);

        return [outerIndex, innerIndex];
    }

    const setBoardSquaresEmpty = function () {
        gameBoardSquares.forEach((item) => {
            item.forEach((element) => element.textContent = "");
        });
    };

    const printPlayerTurn = function() {
        if (gameEngine.gameStatus == "Win" || gameEngine.gameStatus == "Draw")
        return;

        domReference.gameResult.textContent = `${currentPlayer.name} turn`;
    };

    playAgainButton.addEventListener("click", setBoardSquaresEmpty)
    playAgainButton.addEventListener("click", () => {
        gameEngine.gameStatus = "";
        gameEngine.resetGameBoard();
        currentPlayer = Players.player1
        printPlayerTurn();
    });
    printPlayerTurn();
}();