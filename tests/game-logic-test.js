describe("GameLogic", function(){
    var GameLogic,
        ClassicGameConfig;

    beforeEach(function(){
        ClassicGameConfig = require("../js/game-configs/classic");
        GameLogic = require("../js/game-logic")(ClassicGameConfig);
    });

    describe("getGameName", function(){
        var actualGameName;
        beforeEach(function(){
            actualGameName = GameLogic.getGameName();
        });

        it("should return the expected gameName", function(){
            expect(actualGameName).toEqual(ClassicGameConfig.gameName);
        });
    });

    describe("getPossibleChoices", function(){
        var actualPossibleChoices;
        beforeEach(function(){
            actualPossibleChoices = GameLogic.getPossibleChoices();
        });

        it("should return the correct number of possible choices", function(){
            expect(actualPossibleChoices.length).toEqual(ClassicGameConfig.possibleChoices.length);
        });

        describe("id property", function(){
            var actualExtractedIds;
            beforeEach(function(){
                actualExtractedIds = actualPossibleChoices.map(function(c){ return c.id; });
            });

            it("should exist for every possible choice", function(){
                expect(actualExtractedIds).toEqual([0, 1, 2]);
            });
        });
    });

    describe("getWinner", function(){
        var actualWinner,
            usersChoice,
            computersChoice;

        beforeEach(function(){
            usersChoice = GameLogic.getPossibleChoices()[1];
            computersChoice = GameLogic.getPossibleChoices()[0];
            actualWinner = GameLogic.getWinner(usersChoice, computersChoice);
        });

        it("should return the correct number of possible choices", function(){
            expect(actualWinner).toEqual("PLAYER1");
        });
    });

    describe("letComputerPlay", function(){
        var actualChoice,
            expectedChoice;

        beforeEach(function(){
            spyOn(Math, "random").and.returnValue(0.73);
            actualChoice = GameLogic.letComputerPlay();
            expectedChoice = ClassicGameConfig.possibleChoices[2];
        });

        it("should return the correct number of possible choices", function(){
            expect(actualChoice).toEqual(expectedChoice);
        });
    });

});
