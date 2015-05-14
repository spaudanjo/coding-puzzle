describe("Game", function(){
    var Game, UI, GameLogic, numberOfChoices, computersChoiceIndex, computersChoice,
    registeredUserChooseEventHandlers, registeredClickHandlerForComputerVsComputerLink,
    possibleChoices,
    nop = function(){};

    beforeEach(function(){
        computersChoiceIndex = 2;
        registeredUserChooseEventHandlers = [];
        possibleChoices = [
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
        ];
        computersChoice = possibleChoices[computersChoiceIndex];

        UI = {
            setMarkingOnChoiceForPlayer: nop,
            createAndAddChoiceElementForPlayer: function(n, choice, handler){
                if(handler)
                {
                    registeredUserChooseEventHandlers.push(handler);
                }
            },
            markContainerElementsWithGameConfigName: nop,
            registerClickHandlerForComputerVsComputerLink: function(handler){
                registeredClickHandlerForComputerVsComputerLink = handler;
            },
            highlightPlayer: nop
        };

        GameLogic = {
            getGameName: nop,
            getWinner: nop,
            letComputerPlay: function(){
                return possibleChoices[computersChoiceIndex];
            },
            getPossibleChoices: function(){
                return possibleChoices;
            }
        };

        Game = require("../js/game")(GameLogic, UI);
        numberOfChoices = GameLogic.getPossibleChoices().length;

        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe("initGame", function(){

        beforeEach(function() {
            spyOn(UI, "markContainerElementsWithGameConfigName");
            spyOn(UI, "setMarkingOnChoiceForPlayer");
            spyOn(UI, "createAndAddChoiceElementForPlayer").and.callThrough();

            spyOn(GameLogic, "letComputerPlay").and.callThrough();

            Game.initGame();
        });

        it("should call 'markContainerElementsWithGameConfigName' with GameLogic.getGameName()", function(){
            expect(UI.markContainerElementsWithGameConfigName).toHaveBeenCalledWith(GameLogic.getGameName());
        });

        describe("'UI.createAndAddChoiceElementForPlayer'", function(){
            it("should be called, 2*n times (once for player1 and once for player2, n=number of choices)", function(){
                expect(UI.createAndAddChoiceElementForPlayer.calls.count())
                .toBe(numberOfChoices * 2);
            });

            it("should create and pass in n handlers for the 'user choose' event", function(){
                expect(registeredUserChooseEventHandlers.length).toEqual(numberOfChoices);
            });

            describe("calling one of the registered handlers for the 'user choose' event", function(){
                beforeEach(function(){
                    registeredUserChooseEventHandlers[0]();
                });

                it("should call UI.setMarkingOnChoiceForPlayer with (1, FIRST_POSSIBLE_CHOICE, true)", function(){
                    var firstPossibleChoice = GameLogic.getPossibleChoices()[0];
                    expect(UI.setMarkingOnChoiceForPlayer)
                    .toHaveBeenCalledWith(1, firstPossibleChoice, true);
                });

                it("should call GameLogic.letComputerPlay", function(){
                    expect(GameLogic.letComputerPlay).toHaveBeenCalled();
                });

                describe("ticking the clock (for setTimeout callbacks) for 901 ms", function(){
                    beforeEach(function(){
                        jasmine.clock().tick(901);
                    });

                    it("should call UI.setMarkingOnChoiceForPlayer with (2, COMPUTERS_CHOICE, true)", function(){
                        expect(UI.setMarkingOnChoiceForPlayer.calls.mostRecent().args)
                        .toEqual([2, computersChoice, true]);
                    });

                    describe("ticking the clock (for setTimeout callbacks) for another 801 ms", function(){
                        beforeEach(function(){
                            jasmine.clock().tick(801);
                        });

                        it("should call UI.setMarkingOnChoiceForPlayer two times for removing the marking again)", function(){
                            var firstPossibleChoice = GameLogic.getPossibleChoices()[0];
                            expect(UI.setMarkingOnChoiceForPlayer.calls.argsFor(2))
                            .toEqual([1, firstPossibleChoice, false]);
                            expect(UI.setMarkingOnChoiceForPlayer.calls.argsFor(3))
                            .toEqual([2, computersChoice, false]);
                        });
                    });
                });
            });
            describe("calling the handler for the 'click computer vs computer link' event", function(){
                beforeEach(function(){
                    registeredClickHandlerForComputerVsComputerLink();
                });

                it("should call GameLogic.letComputerPlay", function(){
                    expect(GameLogic.letComputerPlay).toHaveBeenCalled();
                });

                it("should call UI.setMarkingOnChoiceForPlayer", function(){
                    expect(UI.setMarkingOnChoiceForPlayer).toHaveBeenCalled();
                });
            });
        });
    });
});
