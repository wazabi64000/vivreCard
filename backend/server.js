import { env } from "./src/config/env.js";
import app from "./src/app.js";

const PORT = env.PORT;

app.get("/", (req, res) => {
  res.send('Mon serveur fonctionne bien !!! ')
})

// Optionnel : On ne lance le .listen() que si on est en local
if (process.env.NODE_ENV !== 'production') {
  const PORT = env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur local sur http://localhost:${PORT}`);
  });
}