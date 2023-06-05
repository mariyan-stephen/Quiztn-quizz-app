<script>
    // Function to decode HTML entities
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    let categories = [{ id: 9, name: "General Knowledge" }, /* add more categories as needed */];
    let selectedCategory = categories[0].id;
    
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let quizFinished = false;
    let timer = 30;

    function getQuestions() {
        fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple`)
            .then(response => response.json())
            .then(data => {
                questions = data.results.map((question, index) => ({
                    id: index + 1,
                    questionText: question.question,
                    answers: [
                        ...question.incorrect_answers.map(answer => ({ answerText: answer, isCorrect: false })),
                        { answerText: question.correct_answer, isCorrect: true }
                    ].sort(() => Math.random() - 0.5) // to shuffle the answers
                }));
            });
    }

    getQuestions();

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        } else {
            quizFinished = true;
        }
        timer = 30;
    }

    function checkAnswer(answer) {
        if (answer.isCorrect) {
            score++;
        }
        nextQuestion();
    }

    function startTimer() {
        let interval = setInterval(() => {
            timer--;
            if (timer === 0 || quizFinished) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000); // 1000 milliseconds = 1 second
    }

    startTimer();
</script>

<style>
    .quiz-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        padding: 2em;
    }

    .question {
        margin-bottom: 1em;
        text-align: center;
    }

    ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .option {
        background-color: #f0f0f0;
        padding: 1em;
        margin: 0.5em;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .option:hover {
        background-color: #e0e0f0;
    }

    .score-display {
        font-size: 2em;
        font-weight: bold;
        text-align: center;
    }
</style>

<div class="component">
    <select bind:value={selectedCategory} on:change={getQuestions}>
        {#each categories as category}
            <option value={category.id}>{category.name}</option>
        {/each}
    </select>
    {#if quizFinished}
        <div class="score-display">
            <h2>Your score: {score}/{questions.length}</h2>
        </div>
    {:else if questions.length > 0}
        <div class="quiz-container">
            <div class="question">
                <h2>{decodeHtml(questions[currentQuestionIndex].questionText)}</h2>
            </div>
            <ul>
                {#each questions[currentQuestionIndex].answers as answer (answer.answerText)}
                    <li class="option" on:click={() => checkAnswer(answer)}>
                        {decodeHtml(answer.answerText)}
                    </li>
                {/each}
            </ul>
            <div>Time Remaining: {timer}</div>
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</div>
