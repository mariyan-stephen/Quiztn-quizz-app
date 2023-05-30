<script>
    // Function to decode HTML entities
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    let questions = [];
    let score = 0;
    let quizFinished = false;

    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(data => {
            questions = data.results.map((question, index) => ({
                id: index + 1,
                questionText: decodeHtml(question.question),
                correctAnswer: decodeHtml(question.correct_answer),
                answers: [
                    ...question.incorrect_answers.map(answer => decodeHtml(answer)),
                    decodeHtml(question.correct_answer)
                ].sort(() => Math.random() - 0.5) // to shuffle the answers
            }));
        });

    let currentQuestionIndex = 0;

    function checkAnswer(answer) {
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            score++;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        } else {
            quizFinished = true;
        }
    }
</script>

{#if quizFinished}
    <div>
        <h2>Your score: {score}/{questions.length}</h2>
    </div>
{:else if questions.length > 0}
    <div>
        <h2>{questions[currentQuestionIndex].questionText}</h2>
        <ul>
            {#each questions[currentQuestionIndex].answers as answer (answer)}
                <li>
                    <button on:click={() => checkAnswer(answer)}>{answer}</button>
                </li>
            {/each}
        </ul>
    </div>
{:else}
    <div>Loading...</div>
{/if}
