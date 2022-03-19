const startingMinutes = .1;
let time = startingMinutes * 60;
let seconds = time % 60;

const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown () {
    const minutes = Math.floor(time / 60);

    seconds = seconds < 2 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${time}`;
    if (time == -1) {
        clearInterval(countdownEl);
        alert("Time out!! :(");

        window.location.href='../html/end.html'
    }
    time--;
}

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'How many legs does a spider have??',
        choice1: '6',
        choice2: '8',
        choice3: '2',
        choice4: '12',
        answer: 2,
    },
    {
        question: 'What is the name of the toy cowboy in Toy Story?',
        choice1: 'Woody',
        choice2: 'Mr. Potato Head',
        choice3: 'Rex',
        choice4: 'Buzz Lightyear',
        answer: 1,
    },
    {
        question: 'What is the color of an emerald?',
        choice1: 'Orange',
        choice2: 'Turqoise',
        choice3: 'Green',
        choice4: 'Yellow',
        answer: 3,
    },
    {
        question: 'Whose nose grew longer every time he lied?',
        choice1: 'Shrek',
        choice2: 'Donkey',
        choice3: 'Pinocchio',
        choice4: 'Gingerbread Man',
        answer: 3,
    },
    {
        question: 'What is the name of the fairy in Peter Pan?',
        choice1: 'Wendy',
        choice2: 'Captain Hook',
        choice3: 'Solid Snake',
        choice4: 'Tinkerbell',
        answer: 4,
    },
    {
        question: 'In the nursery rhyme, Jack and Jill, what do Jack and Jill go up the hill to fetch?',
        choice1: 'A Pail of water',
        choice2: 'Gumdrops',
        choice3: 'A bowl of porridge',
        choice4: 'Bananas',
        answer: 1,
    },
    {
        question: 'How many planets are in our solar system?',
        choice1: '9',
        choice2: '8',
        choice3: '10',
        choice4: '12',
        answer: 2,
    },
    {
        question: 'According to the Dr. Seuss book, who stole Christmas?',
        choice1: 'The Grinch',
        choice2: 'The Gronch',
        choice3: 'Max the dog',
        choice4: 'Wendy Who',
        answer: 1,
    },
    {
        question: 'What type of fish is Nemo?',
        choice1: 'Clownfish',
        choice2: 'Puffer',
        choice3: 'Shark',
        choice4: 'Squid',
        answer: 1,
    },
    {
        question: 'What do caterpillars turn into?',
        choice1: 'Moth',
        choice2: 'Cocoon',
        choice3: 'Ice-Cream',
        choice4: 'Butterflies',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../html/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else {
            decreaseScore(SCORE_POINTS)
            time-=10;

        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
} 

decreaseScore = num => {
    score -=num
    scoreText.innerText = score
} 

startGame()