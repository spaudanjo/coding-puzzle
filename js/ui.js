module.exports = function(DomHelper, document) {

    var choicesContainerForPlayers = [],
        playerLabels = [];

    function getChoicesContainerForPlayer(n){
        choicesContainerForPlayers[n] = choicesContainerForPlayers[n] || document.querySelector("#player" + n + " .choice-list");
        return choicesContainerForPlayers[n];
    }

    function getLabelForPlayer(n){
        playerLabels[n] = playerLabels[n] || document.querySelector("#player" + n + " h2");
        return playerLabels[n];
    }

    function registerClickHandlerForComputerVsComputerLink(handler){
        document.getElementById("computer-vs-computer-link").onclick = handler;
    }

    function setMarkingOnChoiceForPlayer(n, choice, mark){
        var containerElement = getChoicesContainerForPlayer(n),
        choiceEl = containerElement.querySelector("." + choice.name);
        if(mark)
        {
            DomHelper.addClassNameToElement(choiceEl, "marked");
        }
        else
        {
            DomHelper.removeClassNameFromElement(choiceEl, "marked");
        }
    }

    function highlightPlayer(n){
        var playerLabel = getLabelForPlayer(n);
        DomHelper.addClassNameToElement(playerLabel, "highlight");
        setTimeout(function(){
            DomHelper.removeClassNameFromElement(playerLabel, "highlight");
        }, 1000);
    }

    function markContainerElementsWithGameConfigName(gameName){
        [1, 2].forEach(function(n){
            DomHelper.addClassNameToElement(getChoicesContainerForPlayer(n), gameName);
        });
    }

    function createAndAddChoiceElementForPlayer(n, choice, eventListener){
        var containerElement = getChoicesContainerForPlayer(n),
        div = document.createElement("div"),
        classAtt = document.createAttribute("class");
        classAtt.value = choice.spriteName + " choice";
        div.setAttributeNode(classAtt);

        if(eventListener)
        {
            div.addEventListener("click", eventListener);
        }

        var liContainer = document.createElement("li");
        liContainer.appendChild(div);

        containerElement.appendChild(liContainer);
    }

    return {
        setMarkingOnChoiceForPlayer: setMarkingOnChoiceForPlayer,
        createAndAddChoiceElementForPlayer: createAndAddChoiceElementForPlayer,
        markContainerElementsWithGameConfigName: markContainerElementsWithGameConfigName,
        registerClickHandlerForComputerVsComputerLink: registerClickHandlerForComputerVsComputerLink,
        highlightPlayer: highlightPlayer
    };
};
