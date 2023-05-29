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
    let selectedAnswer = null;
    let score = 0;

    function selectAnswer(answer) {
        selectedAnswer = answer;
    }

    function nextQuestion() {
        if (selectedAnswer && selectedAnswer.isCorrect) {
            score++;
        }
        selectedAnswer = null;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        } else {
            // Quiz ended. Do something with the score.
            console.log('Quiz ended. Your score: ', score);
        }
    }
</script>

{#if questions.length > 0}
    <div>
        <h2>{questions[currentQuestionIndex].questionText}</h2>
        <ul>
            {#each questions[currentQuestionIndex].answers as answer (answer.answerText)}
                <li>
                    <button on:click={() => selectAnswer(answer)}>{answer.answerText}</button>
                </li>
            {/each}
        </ul>
        <button on:click={nextQuestion}>Next Question</button>
    </div>
{:else}
    <div>Loading...</div>
{/if}
