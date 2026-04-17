import { LightningElement, track } from 'lwc';

import SF_LOGO from '@salesforce/resourceUrl/SFLogo';
import APPY_IMG from '@salesforce/resourceUrl/Appy';
import ASTRO_IMG from '@salesforce/resourceUrl/Astro';
import CLOUDY_IMG from '@salesforce/resourceUrl/Cloudy';
import MAX_IMG from '@salesforce/resourceUrl/Max';
import CODEY_IMG from '@salesforce/resourceUrl/Codey';

export default class CharacterQuiz extends LightningElement {
    @track currentStep = 1;
    @track scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    @track isQuizActive = true;
    @track history = [];
    @track resultCharacter = '';
    @track resultDescription = '';
    @track resultImage = '';
    @track viewMode = 'launch';
    sfLogo = SF_LOGO;

    get isLaunchMode() { return this.viewMode === 'launch'; }
    get isQuizMode()   { return this.viewMode === 'quiz'; }
    get isResultMode() { return this.viewMode === 'result'; }
    


    

    questions = [
        { id: 1, label: "What is your favorite thing to do?", options: [
            { text: "Go on a big adventure", value: "A" },
            { text: "Build amazing things", value: "B" },
            { text: "Help friends reach goals", value: "C" },
            { text: "Solve hard puzzles", value: "D" },
            { text: "Start a new business", value: "E" }
        ]},
        { id: 2, label: "How do your friends describe you?", options: [
            { text: "Friendly and kind", value: "A" },
            { text: "Silly and full of energy", value: "B" },
            { text: "A smart leader", value: "C" },
            { text: "A very hard worker", value: "D" },
            { text: "A great connector", value: "E" }
        ]},
        { id: 3, label: "What is your favorite thing to wear?", options: [
            { text: "A cozy hoodie", value: "A" },
            { text: "A cool hat", value: "B" },
            { text: "Colorful boots", value: "C" },
            { text: "A high-tech suit", value: "D" },
            { text: "A professional vest", value: "E" }
        ]},
        { id: 4, label: "What is your dream goal?", options: [
            { text: "Bring everyone together", value: "A" },
            { text: "Make something new", value: "B" },
            { text: "Keep everyone safe", value: "C" },
            { text: "Solve big problems", value: "D" },
            { text: "Turn big ideas into reality", value: "E" }
        ]}
    ];

    startQuiz() {
        this.viewMode = 'quiz';
    }

    get activeQuestion() {
        return this.questions[this.currentStep - 1];
    }

    handleAnswer(event) {
        const choice = event.target.dataset.value;
        
        // Save current state to history before updating
        this.history.push({ ...this.scores });
        this.scores[choice]++;

        if (this.currentStep < this.questions.length) {
            this.currentStep++;
        } else {
            this.calculateResult();
        }
    }

    handleBack() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.scores = this.history.pop();
        } else {
            this.viewMode = 'launch';
        }
    }

   calculateResult() {
    this.viewMode = 'result';
    const scores = {
        Astro:  this.scores.A,
        Codey:  this.scores.B,
        Cloudy: this.scores.C,
        Max:    this.scores.D,
        Appy:   this.scores.E
    };

    // 1. Find the highest score value
    const maxScore = Math.max(...Object.values(scores));

    // 2. Filter characters that share that highest score
    const winners = Object.keys(scores).filter(key => scores[key] === maxScore);

    // 3. If there is a tie, pick one randomly (or use winners[0] for first match)
    this.resultCharacter = winners[Math.floor(Math.random() * winners.length)];

    this.resultCharacter = Object.keys(scores)
        .reduce((a, b) => scores[a] > scores[b] ? a : b);
        
        const characterData = {
            'Astro': {
                desc: 'You are warm, curious, and love making everyone feel included!',
                img: ASTRO_IMG
            },
            'Codey': {
                desc: 'You are a resourceful maker who inspires others to build!',
                img: CODEY_IMG
            },
            'Appy': {
                desc: 'You are a bold leader and connector who turns big ideas into reality!',
                img:APPY_IMG
            },
            'Cloudy': {
                desc: 'You are a tech-savvy leader who helps everyone stay on the right trail!',
                img: CLOUDY_IMG
            },
            'Max': {
                desc: 'You are a hard-working hero who loves to connect everything together!',
                img: MAX_IMG
            },
        };

        this.resultDescription = characterData[this.resultCharacter].desc;
        this.resultImage = characterData[this.resultCharacter].img;
    }

    resetQuiz() {
        this.viewMode = 'launch';
        this.currentStep = 1;
        this.scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        this.history = [];
    }
}