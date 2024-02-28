/* - make a function that stores the gameBoard array and allows a way to put x and o inside the array
   - play objects should have names, a symbol(x,o) and a method to put values on the gameboard 
   - gameboard should be able to recognize when a player wins and the array is full and no one has won 
   - 
 */



const gameBoard = function () {

    const gameBoardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const returnGameBoard = function () {
        return gameBoardArray;
    }

    return { returnGameBoard }
}();

const gameEngine = function (gameBoardArray = gameBoard.returnGameBoard()) {

    const markGameBoard = function (outerIndex, innerIndex, playerSymbol) {
        gameBoardArray[outerIndex][innerIndex] = playerSymbol;
        alertWinOrDraw(playerSymbol);
    };

    const checkWinOrDraw = function (playerSymbol) {
        let win = false;
        let emptySquarePresent;

        //fix bug that makes it set win to true when first encounter matches playerSymbol
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
        const winner = playerSymbol === "X" ? player1.name : player2.name;

        if (checkWinOrDraw(playerSymbol).win === true) {
            console.log(`you have won ${winner}. Resetting GameBoard`)
            resetGameBoard();
        }

        else if (checkWinOrDraw(playerSymbol).emptySquarePresent === false) {
            console.log("It is a draw! resetting GameBoard")
            resetGameBoard();
        }

    }

    const resetGameBoard = function () {
        gameBoardArray.forEach((item) => {
            item[0] = "";
            item[1] = "";
            item[2] = "";
        })
    }

    return { markGameBoard };
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
        const player1ChangeButton = document.querySelector(".player1 > button");
        const player2ChangeButton = document.querySelector(".player2 > button");
        const player1Input = document.querySelector(".player1 > input");
        const player2Input = document.querySelector(".player2 > input");

        player1ChangeButton.addEventListener("click", () => {
            player1Input.disabled = false;
            player1Input.focus()
        })

        player1Input.addEventListener("change", (event) => {
            if (player1Input.value.trim() !== "")
                player1.name = player1Input.value;

            player1Input.disabled = true;
            player1Input.value = "";
            printPlayerName();
        })

        player2ChangeButton.addEventListener("click", () => {
            player2Input.disabled = false;
            player2Input.focus()
        })

        player2Input.addEventListener("change", (event) => {
            if (player2Input.value.trim() !== "")
                player2.name = player2Input.value;

            player2Input.disabled = true;
            player2Input.value = "";
            printPlayerName();
        })
    }();

    function printPlayerName() {
        const player1Input = document.querySelector(".player1 > input");
        const player2Input = document.querySelector(".player2 > input");

        player1Input.setAttribute("placeholder", player1.name);
        player2Input.setAttribute("placeholder", player2.name);
    }

    return { player1, player2 };
}();

