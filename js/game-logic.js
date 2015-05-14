module.exports = function(GameConfig){

    function getGameName() {
        return GameConfig.gameName;
    }

    function getPossibleChoices() {
        // add indexes as hash elements
        return GameConfig.possibleChoices.map(function(choice, id){
            choice.id = id;
            return choice;
        });
    }

    function getWinnerByRemainder(remainder){
        return GameConfig.winnerRules[remainder];
    }

    function getWinner(usersChoice, computersChoice) {
        var diff = usersChoice.id - computersChoice.id,
        n = getPossibleChoices().length,
        // we are using this 'strange' operation for getting only positive remainders
        // see: http://javascript.about.com/od/problemsolving/a/modulobug.htm
        remainder = ((diff % n) + n) % n;

        return getWinnerByRemainder(remainder);
    }

    function letComputerPlay(){
        var n = getPossibleChoices().length,
        randomMove = Math.floor((Math.random() * n)),
        computersChoice = getPossibleChoices()[randomMove];
        return computersChoice;
    }

    return {
        getGameName: getGameName,
        getWinner: getWinner,
        letComputerPlay: letComputerPlay,
        getPossibleChoices: getPossibleChoices
    };
};
