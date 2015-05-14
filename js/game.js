module.exports = function(GameLogic, UI){
    var currentlyPlaying = false;

    /**
     * Highlights the label of the winner, or, if it's a tie, of both players.
     * @param winner {String} the string identifier for the player who won
    */
    function highlightWinner(winner){
        switch(winner) {
            case "EQUAL":
                UI.highlightPlayer(1);
                UI.highlightPlayer(2);
                break;
            case "PLAYER1":
                UI.highlightPlayer(1);
                break;
            case "PLAYER2":
                UI.highlightPlayer(2);
                break;
        }
    }

    /**
     * Do the final steps for completing the current round
     * The selected choice will be marked for this round
     * The computer will do a choice
     * After a little break, the computer's choice will be marked
     * The winner will be determined
     * Then, again after a short break, the winner will be highlighted and both marked choices will get unmarked again
     * @param player1Choice
     * @param player2Choice
    */
    function finishRound(player1Choice){
        var player2Choice = GameLogic.letComputerPlay();

        setTimeout(function(){
            UI.setMarkingOnChoiceForPlayer(2, player2Choice, true);
            var winner = GameLogic.getWinner(player1Choice, player2Choice);
            setTimeout(function(){
                highlightWinner(winner);
                UI.setMarkingOnChoiceForPlayer(1, player1Choice, false);
                UI.setMarkingOnChoiceForPlayer(2, player2Choice, false);
                currentlyPlaying = false;
            }, 900);
        }, 800);
    }

    /**
     * Event handler: when user clicks an option, the following workflow starts:
     * The users (player1) choice will get marked
     * The 'finishRound' function will be called
     * During this process, the 'currentlyPlaying' flag is set to true, so that no other choice can be made during this round (will be set to false at the end of the 'finishRound' call)
     * @param player1Choice Contains the information about the users choice - you find all possible choices in the corresponding game config
     * @param player1Choice.name name of the choice
     * @param player1Choice.spriteName CSS image sprite identifier
    */
    function userChooseEventHandler(player1Choice){
        currentlyPlaying = true;

        UI.setMarkingOnChoiceForPlayer(1, player1Choice, true);

        finishRound(player1Choice);
    }

    /**
     * Each possible choice of the current game config will be 'injected' to the
     * DOM (via the UI module): once for the user (player1) and once for the computer (player2)
     * The user choice element will also get attached with a event handler,
     * which calls userChooseEventHandler for the current choice, but only if the 'currentlyPlaying' flag is not set to true
    */
    function injectChoiceElements(){
        GameLogic.getPossibleChoices().forEach(function(choice){
            UI.createAndAddChoiceElementForPlayer(1, choice, function(){
                if(!currentlyPlaying)
                {
                    userChooseEventHandler(choice);
                }
            });
            UI.createAndAddChoiceElementForPlayer(2, choice);
        });
    }

    /**
     * Event handler for the 'let the computer play this round for me' link
     * If currently no round is running, the computer will not only play for player2,
     * but also player1 (user)
     * the rest is quite similar to 'userChooseEventHandler',
     * because it's actually just the 'finishRound' call
    */
    function registerComputerVsComputerEventHandler(){
        var handler = function(){
            if(!currentlyPlaying)
            {
                currentlyPlaying = true;

                var player1Choice = GameLogic.letComputerPlay();
                UI.setMarkingOnChoiceForPlayer(1, player1Choice, true);

                finishRound(player1Choice);
            }
        };
        UI.registerClickHandlerForComputerVsComputerLink(handler);
    }

    /**
     * The only public method: will be called to init the whole game
     * Marks the container elements for player1 and player2 with the name
     * of the current game config, so that the sprite css selectors works fine.
     * Creates than the choice options
     * And adds the 'let the computer play the next round for me' event handler
    */
    function initGame(){
        UI.markContainerElementsWithGameConfigName(GameLogic.getGameName());
        injectChoiceElements();
        registerComputerVsComputerEventHandler();
    }

    return {
        initGame: initGame
    };

};
