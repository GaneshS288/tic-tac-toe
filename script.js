/* - make a function that stores the gameBoard array and allows a way to put x and o inside the array
   - play objects should have names, a symbol(x,o) and a method to put values on the gameboard 
   - gameboard should be able to recognize when a player wins and the array is full and no one has won 
   - 
 */



const PlayGame = function() {
    const gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    const returnGameBoard = function() {
        return gameBoard;
    }

    const markGameBoard = function(outerIndex, innerIndex, playerSymbol) {
        gameBoard[outerIndex][innerIndex] = playerSymbol;
    };

    return {returnGameBoard, markGameBoard}
}();

console.table(PlayGame.returnGameBoard());

PlayGame.markGameBoard(1,1,"X");
PlayGame.markGameBoard(1,2,"X");

console.table(PlayGame.returnGameBoard());