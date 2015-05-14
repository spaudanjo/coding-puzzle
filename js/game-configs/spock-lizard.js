module.exports =
{
    gameName: "spock-lizard",
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
        },
        {
            name: "spock",
            spriteName: "spock"
        },
        {
            name: "lizard",
            spriteName: "lizard"
        }
    ],
    winnerRules: {
        0: "EQUAL",
        1: "PLAYER1",
        3: "PLAYER1",
        2: "PLAYER2",
        4: "PLAYER2"
    }
};
