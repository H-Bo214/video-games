const express = require("express");
const { request, response } = require("express");
const app = express();
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.locals.title = "Games";
app.locals.games = [
  {
    id: "1a",
    name: "Grand Theft Auto V",
    released: "2013-09-17",
    background_image:
      "https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg",
  },
  {
    id: "2b",
    name: "The Witcher 3: Wild Hunt",
    released: "2015-05-18",
    background_image:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  },
  {
    id: "3c",
    name: "Limbo",
    released: "2010-07-21",
    background_image:
      "https://media.rawg.io/media/games/929/9295e55ce69cf5337c567983cf8b4137.jpeg",
  },
];
app.get('/', (request, response) => {
  response.send('Let the games begin!!!')
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
  })

  app.get('/api/games', (request, response) => {
    if (!response) {
      response.status(500).json({
        errorMessage: 'Could not get game data.'
      })
    }
    response.status(200).json(app.locals.games)
  })

  app.get('/api/games/:id', (request, response) => {
    const { id } = request.params
    console.log('const id', typeof id)
    const game = app.locals.games.find(game => game.id === id)
    if (!game) {
      response.status(400).json({
        errorMessage: `Could not find a game with an id of ${id}.`
      })
    }
    response.status(200).json(game)
  })

  app.post('/api/games', (request, response) => {
    const requiredProperties = ['name', 'released','background_image'];
      for (let property of requiredProperties) {
        if(!request.body[property]) {
          return response.status(422).json({errorMessage: `Cannot POST: no property of ${property} in request.`})
        }
      }
      const { name, released, background_image } = request.body
      const id = Date.now().toString()
      app.locals.games.push({ name, released, background_image, id })
      response.status(201).json({ name, released, background_image })
  })