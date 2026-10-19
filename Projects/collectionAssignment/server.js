const express = require('express');
const app = express();

// Enable JSON parsing middleware for request bodies
app.use(express.json());

// array of MVP records
const MVPs = [
  {
    id: 1,
    "player": "Kareem Abdul-Jabbar",
    "mvp_count": 6,
    "seasons": ["1970-71", "1971-72", "1973-74", "1975-76", "1976-77", "1979-80"]
  },
  {
    id: 2,
    "player": "Michael Jordan",
    "mvp_count": 5,
    "seasons": ["1987-88", "1990-91", "1991-92", "1995-96", "1997-98"]
  },
  {
    id: 3,
    "player": "Bill Russell",
    "mvp_count": 5,
    "seasons": ["1957-58", "1960-61", "1961-62", "1962-63", "1964-65"]
  },
  {
    id: 4,
    "player": "Wilt Chamberlain",
    "mvp_count": 4,
    "seasons": ["1959-60", "1965-66", "1966-67", "1967-68"]
  },
  {
    id: 5,
    "player": "LeBron James",
    "mvp_count": 4,
    "seasons": ["2008-09", "2009-10", "2011-12", "2012-13"]
  },
  {
    id: 6,
    "player": "Nikola Jokić",
    "mvp_count": 3,
    "seasons": ["2020-21", "2021-22", "2023-24"]
  },
  {
    id: 7,
    "player": "Larry Bird",
    "mvp_count": 3,
    "seasons": ["1983-84", "1984-85", "1985-86"]
  },
  {
    id: 8,
    "player": "Magic Johnson",
    "mvp_count": 3,
    "seasons": ["1986-87", "1988-89", "1989-90"]
  },
  {
    id: 9,
    "player": "Moses Malone",
    "mvp_count": 3,
    "seasons": ["1978-79", "1981-82", "1982-83"]
  }

]

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'collection.html'));
});

app.get('/Hcollection.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'Hcollection.js'));
});

// GET: Retrieve all MVPs
app.get('/api/mvps', (req, res) => {
    res.send(MVPs);
});

// GET: Retrieve a single MVP by ID
app.get('/api/mvps/:id', (req, res) => {
    const mvp = MVPs.find(mvp => mvp.id === parseInt(req.params.id));
    if (!mvp) return res.status(404).send('The MVP with the given ID was not found.');
    res.send(mvp);
});

// POST: Create a new MVP
app.post('/api/mvps', (req, res) => {
    const mvp = {
        id: MVPs.length + 1,
        player: req.body.player,
        mvp_count: req.body.mvp_count,
        seasons: req.body.seasons
    };
    MVPs.push(mvp);
    res.status(201).send(mvp);
});

// PUT: Update an existing MVP
app.put('/api/mvps/:id', (req, res) => {
    const mvp = MVPs.find(mvp => mvp.id === parseInt(req.params.id));
    if (!mvp) return res.status(404).send('The MVP with the given ID was not found.');

    mvp.player = req.body.player;
    mvp.mvp_count = req.body.mvp_count;
    mvp.seasons = req.body.seasons;
    res.send(mvp);
});

// DELETE: Delete an MVP by ID
app.delete('/api/mvps/:id', (req, res) => {
    const index = MVPs.findIndex(mvp => mvp.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('The MVP with the given ID was not found.');

    const [mvp] = MVPs.splice(index, 1);
    res.send(mvp);
});

// Environment port configuration or dynamic fallback to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));