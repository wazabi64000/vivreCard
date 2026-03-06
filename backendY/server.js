import { env } from "./src/config/env.js";
import app from "./src/app.js";

const PORT = env.PORT;

app.get('/', (req, res) => {
  res.send(`

      <em>Click the button</em>
  
  <button>Click Me!</button>
  <br/> <!---this is to create a new line -->

  <p>This is a paragraph text.</p>

  <b>This is a bold text.</b>

  <style>button{
  padding:10px;
  border:3px solid transparent;
  outline:none;
  cursor:pointer
}

.button-toggle{
  color:orange;
  background:transparent;
  border:3px solid orange;
}

p{
  color:green;
  max-width:160px;
}

.p-toggle{
  border-bottom:3px dotted green;
}

b{
  color:red;
  background-color: lightblue;
}

.bold-toggle{
  color:white;
  background-color:black;
}</style>
    `)
})

app.listen(PORT, () => {
  console.log(`Serveur tourn sur localhost:${PORT}`);
});
