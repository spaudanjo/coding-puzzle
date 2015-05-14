module.exports =
{
    gameName: "classic",
    possibleChoices: [
        {
            name: "rock",
            spriteName: "rock"
        },
        {
            name: "paper",
            spriteName: "paper"
        },
        {
            name: "scissors",
            spriteName: "scissors"
        }
    ],
    winnerRules: {
        0: "EQUAL",
        1: "PLAYER1",
        2: "PLAYER2"
    }
};
