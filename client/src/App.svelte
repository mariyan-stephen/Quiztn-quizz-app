<script>
    import { Router, Route, Link } from "svelte-routing";
    import Home from "./components/Home.svelte";
    import About from "./components/About.svelte";
    import Quiz from "./components/Quiz.svelte";
</script>

<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/quiz">Quiz</Link>
    </nav>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/quiz" component={Quiz} />
</Router>

