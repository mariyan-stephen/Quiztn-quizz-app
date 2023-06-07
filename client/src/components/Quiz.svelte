<script>
    // Function to decode HTML entities
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    let categories = [
        { id: 9, name: "General Knowledge" },
        { id: 18, name: "Computers" },
        { id: 19, name: "Mathematics" },
        { id: 20, name: "Mythology" },
        // Add more categories as needed
    ];

    let selectedCategory = categories[0].id;
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let quizFinished = false;
    let timer = 30;
    let quizStarted = false;

    async function getQuestions() {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple`)
        const data = await response.json();
        questions = data.results.map((question, index) => ({
            id: index + 1,
            questionText: question.question,
            answers: [
                ...question.incorrect_answers.map(answer => ({ answerText: answer, isCorrect: false })),
                { answerText: question.correct_answer, isCorrect: true }
            ].sort(() => Math.random() - 0.5) // to shuffle the answers
        }));
    }

    function startQuiz() {
        getQuestions();
        quizStarted = true;
        startTimer();
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
        } else {
            quizFinished = true;
        }
        timer = 30; // reset timer for each new question
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
</script>

<!-- your style code here -->

<div class="component">
    {#if !quizStarted}
        <select bind:value={selectedCategory} on:change={getQuestions}>
            {#each categories as category}
                <option value={category.id}>{category.name}</option>
            {/each}
        </select>
        <button on:click={startQuiz}>Start Quiz</button>
    {:else if quizFinished}
        <!-- your quiz finished display code here -->
    {:else if questions.length > 0}
        <!-- your quiz in-progress display code here -->
    {:else}
        <div>Loading...</div>
    {/if}
</div>
