<script>
    import { Router, Route } from "svelte-routing";
    import Home from "./components/Home.svelte";
    import About from "./components/About.svelte";
</script>

<Router>
    <Route path="/" let:params component={Home} />
    <Route path="about" component={About} />
</Router>
