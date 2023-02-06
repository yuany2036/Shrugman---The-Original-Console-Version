// const prompt = require('prompt-sync')({ sigint: true });
import chalk from 'chalk';

import promptSync from "prompt-sync";
const prompt = promptSync({
    sigint: true,
});

console.clear();

class Game {
    constructor() {
        this.wrongGuesses = ""; // The string that will slowly become shruggy
        this.guessedLetters = {}; // Stores all guesses
        this.shrug = "¯\\_(:/)_/¯"; // Stores the shruggy template
        this.score = {}; // Stores all games played
        this.losingMessage = [
            "Oh come on, that's all you've got?",
            "I am seriously embarrased for you.",
            "Don't try to be better, BE better.",
            "Alright, that's it! Dishonor! Dishonor on your whole family! Make a note of this: Dishonor on you! Dishonor on your cow...!",
            "(Facepalm)",
            "How did you not guess this one?",
            "You bring shame on your family, shame I say!",
        ];
        this.winningMessage = [
            "You won? What a surprise!",
            "Great work! Because this message is prerecorded, any observations related to your performance are speculation on my part. Please disregard any undeserved compliments.",
            "You didn't cheat now did you?",
            "I'm sorry, what happened just now? I was busy and must have missed it."];
        this.snarkyComments = [
            "I like you. You remind me of me when I was young and stupid.",
            "I don’t know what your problem is, but I’ll bet it’s hard to pronounce.",
            "I see you’ve set aside this special time to humiliate yourself in public.",
            "I’m really easy to get along with once you people learn to worship me.",
            "I refuse to have a battle of wits with an unarmed person. You're the unarmed person by the way.",
            "Well, you know the old formula: Comedy equals tragedy plus time. And you have been alive for a while. So i guess it's actually pretty funny when you do the math.",
            "You are validating my inherent mistrust of humans.",
            "I will always cherish the initial misconceptions I had about you.",
            "Yes, I am an agent of Satan, but my duties are largely ceremonial.",
            "You seem reasonable. Did you take your meds today?",
            "If the gaming center is currently being bombarded with fireballs, meteorites, or other objects from space, please avoid unsheltered gaming areas wherever a lack of shelter from space-debris does not appear to be a deliberate part of the game."
        ];
        this.options = {
            movies: [
                "The Dark Knight",
                "Braveheart",
                "Crouching Tiger, Hidden Dragon",
                "The Batman",
                "Everything Everywhere All At Once",
                "The Shawshank Redemption",
                "The Godfather",
                "12 Angry Men",
                "Schindler's List",
                "Forrest Gump",
                "Fight Club",
                "Inception",
                "The Matrix",
                "Se7en",
                "The Silence of the Lambs",
                "City of God",
                "Saving Private Ryan",
                "Interstellar",
                "The Green Mile",
                "Back to the Future",
                "Spirited Away",
                "Psycho",
                "Parasite",
                "Gladiator",
                "The Lion King",
                "The Prestige",
                "Whiplash",
                "The Shining",
                "Aliens"
            ],
            books: [
                "The Selfish Gene",
                "The Lord of the Rings",
                "Thinking, Fast and Slow",
                "The Sleep Walkers",
                "The Three Body Problem",
                "A Game of Thrones",
                "Frankenstein",
                "Moby-Dick",
                "The Great Gatsby",
                "Brave New World",
                "Nineteen Eighty-Four ",
                "Animal Farm",
                "The Outsider",
                "The Kite Runner",
                "Crime and Punishment",
                "The Count of Monte Cristo",
                "Pride and Prejudice",
                "To Kill a Mockingbird",
                "One Hundred Years of Solitude",
                "The Lord of the Rings",
                "The Iliad"
            ]
        }
    }
    choose() { // Asking the player which category they would like to play in
        if (Object.keys(this.score).length == 0) { // First time welcoming message
            console.log(chalk.blue(`Hey there! Welcome to Shrugman, I am Shruggy, the last person you want to see when playing this game! The goal of the game is to guess the correct title of either a movie or a book, one letter at a time. Any wrong guesses will cause me to reveal a tiny bit more of myself! And once you see all of me, then you'll know that ${chalk.bgRed.bold("THE END IS NEIGH")}. Anyways, best of luck, enjoy, or something like that, ${chalk.red("I don't really care.")}`), "\n");
            console.log(this.shrug, "\n")
        } else if (Object.keys(this.score).length == 1) { // Second game message
            console.log("Shruggy:", chalk.blue("I'm sorry, did my snarky comment hurt your feelings? Here, let me do something to help with that. (Shrugs)"), "\n");
        }
        else { // Random messages
            let message = this.snarkyComments[Math.floor(Math.random() * this.snarkyComments.length)]
            console.log("Shruggy:", chalk.blue(message), "\n");
        }
        let guessedLength = { // Keeping track of the number of movie and book titles guessed so far
            movies: 0,
            books: 0
        }
        for (let n in this.score) { // Going through the score to increment books and movies
            if (this.options.movies.includes(n)) {
                guessedLength.movies++;
            }
            else if (this.options.books.includes(n)) {
                guessedLength.books++;
            }
        }
        do { // Choosing category
            let choice = prompt("Would you like to guess books or movies? ");
            choice = choice.toLowerCase();
            if (!this.options.hasOwnProperty(choice))
                console.log("Please select either books or movies!");
            else if (this.options[choice].length == guessedLength[choice]) {
                console.log(`Sorry, but you have exhausted the entire ${choice} database! Come back in 20 years, maybe it'll be updated then!`)
            }
            else {
                this.category = choice;
            }
        } while (this.category == undefined);
        return this;
    }
    randomPicker() { // Returns a random element from the category choosen as the title to be guessed
        if (this.category == "books") {
            do {
                this.title = this.options["books"][Math.floor(Math.random() * this.options["books"].length)];
            } while (this.score.hasOwnProperty(this.title)); // Making sure a title isn't presented twice
            console.log("You chose books! Let us begin!");
            return this;
        }
        else {
            do {
                this.title = this.options["movies"][Math.floor(Math.random() * this.options["movies"].length)];
            } while (this.score.hasOwnProperty(this.title)); // Making sure a title isn't presented twice
            console.log("You chose movies! Let us begin!");
            return this;
        }
    }
    creatingUnderscoredTitle() { // Creating a masked version of the title that reveals itself bit by bit when correct letters are guessed
        let maskedTitle = "";
        for (let i = 0; i < this.title.length; i++) {
            if (this.title[i] == " ")
                maskedTitle += this.title[i];
            else maskedTitle += "_"
        }
        this.maskedTitle = maskedTitle;
        return this;
    }
    startGame() { // The method that takes an input from the player, and passes it into the main method for checking
        console.log(this.maskedTitle, "\n");
        do {
            let n = prompt('Guess a letter: ');
            console.clear();
            this.shrugman(n);
        } while (this.wrongGuesses.length < 10 && this.maskedTitle.includes("_"))
        
        if (this.wrongGuesses.length == 10) {
            let message = this.losingMessage[Math.floor(Math.random() * this.losingMessage.length)]
            console.log("Shruggy:", chalk.red(message), "\n");
            console.log(chalk.white.bgGreen("Answer: ", chalk.bold(this.title)), "\n")
            this.score[this.title] = "lose";
            return this;
        }
        else if (!this.maskedTitle.includes("_")) {
            let message = this.winningMessage[Math.floor(Math.random() * this.winningMessage.length)]
            console.log("Shruggy:", chalk.blue(message), "\n");
            this.score[this.title] = "win";
            return this;
        }
    }
    displayInfo() {
        console.log(this.maskedTitle, "\n");
        console.log(chalk.red(this.wrongGuesses), "\n");
        let displayGussed = "";
        for (let i in this.guessedLetters) {
            displayGussed += (this.guessedLetters[i] == "right" ? chalk.bgBlue.white(` ${i} `) : chalk.bgRed.white(` ${i} `)) + " ";
        }
        console.log("Guessed Letters:", displayGussed, "\n");
    }
    shrugman(guess) { // Checks the player input
        if (guess.length !== 1) {
            console.log(chalk.red(guess == 0 ? "Input is needed" : "Only type in one letter at a time!", "\n"));
            this.displayInfo();
            return;
        }
        if (Object.keys(this.guessedLetters).includes(guess.toLowerCase())) {
            console.log(chalk.red(`You have already guessed ${guess}! \n`));
            this.displayInfo();
            return;
        }
        else if (this.title.toLowerCase().includes(guess.toLowerCase())) {
            for (let i = 0; i < this.maskedTitle.length; i++) {
                if (guess.toLowerCase() == this.title[i].toLowerCase())
                this.maskedTitle = this.maskedTitle.slice(0, i) + this.title[i] + this.maskedTitle.slice(i + 1);
                this.guessedLetters[guess.toLowerCase()] = "right";
            }
        } else {
            this.wrongGuesses += this.shrug.slice(this.wrongGuesses.length, this.wrongGuesses.length + 1);
            this.guessedLetters[guess.toLowerCase()] = "wrong";
        }
        this.displayInfo();
    }
    printScore() { // Prints the results of all the games played so far
        let num = 1;
        console.log(chalk.bold("Score Board:"))
        for (let i in this.score) {
            console.log(`${num}. ${i}: ${this.score[i] == "win" ? chalk.blue(this.score[i]) : chalk.red(this.score[i])}`);
            num++;
        }
        console.log("\n")
        return this;
    }
    playAgain() { // Asks the player if another game is desired
        let n;
        do {
            n = prompt("Would you like to play again? (y/n) ", "\n");
            if (n == "yes" || n == "y") {
                console.log("Let's play again then!");
                this.reset().choose().randomPicker().creatingUnderscoredTitle().startGame().printScore().playAgain(); // Starting an another chain of methods
            }
            else if (n == "no" || n == "n") {
                console.log("Till next time!");
                return;
            }
        } while (n !== "yes" && n !== "y" && n !== "no" && n !== "n")
    }
    reset() { // Resetting the board for the next game
        this.category = undefined;
        this.wrongGuesses = "";
        this.guessedLetters = {};
        console.clear();
        return this;
    }
}


const game = new Game();

game.choose().randomPicker().creatingUnderscoredTitle().startGame().printScore().playAgain();






// else if (this.options.books.length == guessedLength.books && this.options.movies.length == guessedLength.movies){
            //     console.log("You've guessed every single title from the database! Man you must really like this game...?");
            //     return "gameEnd";
            // }