import { alphabet } from './alphabet';

const calcDifficultyOfLetters = (word: string) => {
    const WEIGHTING = 100;
	let sum = 0;
	let alphaChars = 0;
	const characters = word.split('');
	characters.forEach((character) => {
		switch (character.toUpperCase()) {
			case 'A':
			case 'E':
			case 'I':
			case 'L':
			case 'N':
			case 'O':
			case 'R':
			case 'S':
			case 'T':
			case 'U':
				sum += 1;
				alphaChars += 1;
				break;
			case 'D':
			case 'G':
				sum += 2;
				alphaChars += 1;
				break;
			case 'B':
			case 'C':
			case 'M':
			case 'P':
				sum += 3;
				alphaChars += 1;
				break;
			case 'F':
			case 'H':
			case 'V':
			case 'W':
			case 'Y':
				sum += 4;
				alphaChars += 1;
				break;
			case 'K':
				sum += 5;
				alphaChars += 1;
				break;
			case 'J':
			case 'X':
				sum += 8;
				alphaChars += 1;
				break;
			case 'Q':
			case 'Z':
				sum += 10;
				alphaChars += 1;
				break;
            default: 
                break;
		}
	});
    return sum / alphaChars * WEIGHTING;
};

const calcDifficultyOfUnusedLetters = (word) => {
    let sum = 0;
    const letters = alphabet;

    letters.forEach((letter) => {
        if (!word.includes(letter)) {
            switch (letter) {
                case 'A':
                case 'E':
                case 'I':
                case 'L':
                case 'N':
                case 'O':
                case 'R':
                case 'S':
                case 'T':
                case 'U':
                    sum += 10;
                    break;
                case 'D':
                case 'G':
                    sum += 9;
                    break;
                case 'B':
                case 'C':
                case 'M':
                case 'P':
                    sum += 8;
                    break;
                case 'F':
                case 'H':
                case 'V':
                case 'W':
                case 'Y':
                    sum += 7;
                    break;
                case 'K':
                    sum += 6;
                    break;
                case 'J':
                case 'X':
                    sum += 3;
                    break;
                case 'Q':
                case 'Z':
                    sum += 1;
                    break;
                default:
                    break;
            }
        }
    });
    return sum
}

export const calcDifficulty = (word: string) => {
	const difficultyRating = Math.round(calcDifficultyOfLetters(word) + calcDifficultyOfUnusedLetters(word));
    console.log(difficultyRating);
    let difficulty;
    if(difficultyRating < 230) {
        difficulty = 'Easy'
    } else if (difficultyRating >= 230 && difficultyRating < 280) {
        difficulty = 'Medium'
    } else {
        difficulty = 'Hard'
    }
    return difficulty;
};