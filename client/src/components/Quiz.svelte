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
                questionText: decodeHtml(question.question),
                answers: [
                    ...question.incorrect_answers.map(answer => ({ answerText: decodeHtml(answer) })),
                    { answerText: decodeHtml(question.correct_answer) }
                ]
            }));
        });

    let currentQuestionIndex = 0;

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        }
    }
</script>

{#if questions.length > 0}
    <div>
        <h2>{questions[currentQuestionIndex].questionText}</h2>
        <ul>
            {#each questions[currentQuestionIndex].answers as answer (answer.answerText)}
                <li>
                    <button on:click={nextQuestion}>{answer.answerText}</button>
                </li>
            {/each}
        </ul>
    </div>
{:else}
    <div>Loading...</div>
{/if}
