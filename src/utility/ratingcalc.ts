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

const repitionsReduction = (title, description): number => {
    let repetitionSum = 0;
    const descriptionArray = description.replace(/,/g, '').toUpperCase().split(' ');
    descriptionArray.forEach(descWord => {
        if(title.includes(descWord)) {
            const endOfWordIndex = title.indexOf(descWord) + descWord.length
            const nextChar = title.substr(endOfWordIndex, 1);
            if(!/^[a-zA-Z]+$/.test(nextChar)) {
                repetitionSum += descWord.length
            }
        }
    })
    const frequency = repetitionSum / title.replace(/[^A-Za-z']/g, '').length;
    console.log({frequency});
    return 1 - frequency;
}

export const calcDifficulty = (title: string, description?: string) => {
	const difficultyRating = calcDifficultyOfLetters(title) + calcDifficultyOfUnusedLetters(title);
    const finalRating = Math.round(difficultyRating * repitionsReduction(title, description));
    
    let difficulty;
    if(finalRating < 220) {
        difficulty = 'Very Easy';
    } else if(finalRating >= 220 && finalRating < 260) {
        difficulty = 'Easy';
    } else if (finalRating >= 260 && finalRating < 300) {
        difficulty = 'Medium';
    } else if (finalRating >= 300 && finalRating < 340) {
        difficulty = 'Hard';
    } else {
        difficulty = 'Very Hard';
    }
    return difficulty;
};