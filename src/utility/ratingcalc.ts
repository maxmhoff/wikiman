import { alphabet } from './alphabet';

const calcDifficultyOfLetters = (title: string) => {
    const WEIGHTING = 100;
	let sum = 0;
	let alphaChars = 0;
	const characters = title.split('');
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

const calcDifficultyOfUnusedLetters = (title) => {
    let sum = 0;
    const letters = alphabet;

    letters.forEach((letter) => {
        if (!title.includes(letter)) {
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

// A multiplier that reduces the rating if a word in the title is represented in the description.
const repitionsReductionMultiplier = (title: string, description: string): number => {
    let repetitionSum = 0;
    const descriptionArray = description.replace(/,/g, '').toUpperCase().split(' ');
    descriptionArray.forEach(descWord => {
        if(title.includes(descWord)) {
            const startOfWordIndex = title.indexOf(descWord);
            const endOfWordIndex = startOfWordIndex + descWord.length
            let prevChar: string;
            startOfWordIndex === 0? prevChar = '' :  prevChar = title.substr(startOfWordIndex - 1, 1);
            const nextChar = title.substr(endOfWordIndex, 1);
            if(!/^[a-zA-Z]+$/.test(prevChar) && !/^[a-zA-Z]+$/.test(nextChar)) {
                repetitionSum += descWord.length
            }
        }
    })
    const frequency = repetitionSum / title.replace(/[^A-Za-z']/g, '').length;
    return 1 - frequency;
}

export const calcDifficulty = (title: string, description?: string) => {
	let difficultyRating = calcDifficultyOfLetters(title) + calcDifficultyOfUnusedLetters(title);
    difficultyRating = Math.round(difficultyRating * repitionsReductionMultiplier(title, description));
    difficultyRating < 50 ? difficultyRating = 50 : null;

    let difficulty: string;
    if(difficultyRating < 200) {
        difficulty = 'Very Easy';
    } else if(difficultyRating >= 200 && difficultyRating < 260) {
        difficulty = 'Easy';
    } else if (difficultyRating >= 260 && difficultyRating < 300) {
        difficulty = 'Medium';
    } else if (difficultyRating >= 300 && difficultyRating < 340) {
        difficulty = 'Hard';
    } else {
        difficulty = 'Very Hard';
    }
    return difficulty;
};