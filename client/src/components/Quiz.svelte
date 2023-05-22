<script>
    let questions = [];

    // Commenting out the API request until the server-side code is set up
    /*
    onMount(async () => {
        const response = await fetch("/api/questions");
        questions = await response.json();
    });
    */
</script>

<div>
    {#each questions as question (question.id)}
        <h2>{question.questionText}</h2>
        <ul>
            {#each question.answers as answer (answer.id)}
                <li>{answer.answerText}</li>
            {/each}
        </ul>
    {/each}
</div>
