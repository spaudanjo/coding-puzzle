Rock, Paper, Scissors
===========================

## About

This is a simple implementation of the Rock, Paper, Scissors game in plain JavaScript.
You play against the computer.  
You (player 1) click one of the options, then the computer (player2) will choose as well.  
The winner is highlighted red (when there is a tie, both are highlighted).  
You can also decide to let the computer play one round for you against itself ;)  
It's not a visual masterpeace (but will maybe be some day), but it works.  
It allows you to configure variations of the game (like the "Spock, Lizard" extension).

## Getting set up for development

### Libraries/Packages/Dependencies

First you'll need nodejs/npm installed,
npm takes care of the rest of our dependencies.

### Install Build Requirements
`npm install -g gulp`

### Install Packages
`npm install`

### Download and Activate Live Reload Plugin (optional)

http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions

### Navigate to project root and run Gulp

`gulp`

* watches for changes
* compiles sass
* compiles js
* live reloads `index.html`

### Running unit specs

* for test driven development, there is the gulp task 'gulp tdd'
  * when you run it:
    * all unit specs under test/unit will be run once
    * the following files will be watched and tests will be rerun on file changes
      * all files under test/unit
      * most of the files under app will be watched
        * see the 'files' array in test/karma.conf.js for more details

## Change game variation

Just go to js/app.js and adapt the line  
`var GameConfig = require("./game-configs/classic");`  
to use another game config, e.g.  
`var GameConfig = require("./game-configs/spock-lizard");`  

You find the corresponding SCSS and image sprite files under  
`img/choices`  
and  
`sass/game-configs`

## Involved technologies
* browserify for using common.js modules
* Jasmine and karma for testing
* karma-coverage for test coverage analysis
* sass for a Turing complete css implementation :)
* eslint for js linting

## Supported browsers
* it was tested on the current versions of Chrome and Firefox under Ubuntu 14
* also on Chrome for Android on a Samsung Galaxy

## Design desicions
* we use browserify for commonjs module syntax
  * all dependencies of a module will get injected by it's creator
    * this wiring takes place in app.js
* why no classes / oop?
  * in this more or less simple solution, there is no real need for things like creating instances of the same type/class or inheritance
    * instead, we use composition/injecting helper modules where needed

## Next possible tasks
* improve test coverage
  * for now, only the game-logic.js has 100% coverage
* improve comments / code documentation
  * currently only for game.js
* show list with results of the last rounds
* introduce matches with a winner
  * e.g. 5 rounds
* improve architecture, e.g. try to isolate the setTimeout calls
* think about a classic MVC oriented approach
* tryout ECMA Script 6 features like fat arrow, getters, classes/inheritance (e.g. for matches and result list)
* add integration tests (with Protractor, Selenium, phantomjs, ...)
