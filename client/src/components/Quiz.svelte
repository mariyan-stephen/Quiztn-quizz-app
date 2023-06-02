<script>
    // Function to decode HTML entities
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    let questions = [];
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
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

    let currentQuestionIndex = 0;
    let score = 0;
    let quizFinished = false;

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        } else {
            quizFinished = true;
        }
    }

    function checkAnswer(answer) {
        if (answer.isCorrect) {
            score++;
        }
        nextQuestion();
    }
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
        list-style: none;
        padding: 0;
        width: 100%;
    }

    .option {
        background-color: #f0f0f0;
        padding: 1em;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
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
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</div>
