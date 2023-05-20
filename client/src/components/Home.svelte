<script>
  let quizzes = ['Quiz 1', 'Quiz 2', 'Quiz 3'];
</script>

<style>
  main {
    color: white;
    background-color: #008080;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  h1 {
    color: #55d4bb;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    color: #5ebdbd;
    margin-bottom: 1em;
  }

  button {
    background-color: #3dafaf;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>

<main>
  <h1>Welcome to the Quiz App!</h1>
  <p>Select a quiz:</p>
  <ul>
    {#each quizzes as quiz, i}
      <li>{quiz} <button on:click={() => startQuiz(i)}>Start</button></li>
    {/each}
  </ul>
</main>
