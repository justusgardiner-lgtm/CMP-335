// REST API for CRUD operations on the "players" table in MySQL.
// Endpoints: GET /players, GET /select/:playerid, POST /insert,
//            PUT /update/:playerid, DELETE /delete/:playerid

const express = require('express');
let mysql = require('mysql2');

const app = express();
app.use(express.json()); // lets us read JSON request bodies

// Creates a new MySQL connection (caller must connect and end it)
function connectToDatabase() {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CMP335",
    database: "mydb"
  });
  return con;
}

// Get all players
app.get('/players', (req, res) => {
  const con = connectToDatabase();

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query("SELECT * FROM players", function (err, result) {
      if (err) {
        return res.status(500).send("Could not fetch players");
      }

      res.send(result);
      con.end();
    });
  });
});

// Add a new player (playerName is required)
app.post('/insert', (req, res) => {
  if (!req.body.playerName || req.body.playerName.trim() === "") {
    return res.status(400).send("Player name cannot be empty.");
  }

  const con = connectToDatabase();

  const sql = `INSERT INTO players (playerName, playerStats, playerTeam)
   VALUES ('${req.body.playerName}', '${req.body.playerStats}', '${req.body.playerTeam}')`;

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, function (err, result) {
      if (err) {
        con.end();
        return res.status(500).send("Could not insert player");
      }

      res.send(`Player ${req.body.playerName} inserted successfully.`);
      con.end();
    });
  });
});

// Update a player by ID
app.put('/update/:playerid', (req, res) => {
  const con = connectToDatabase();
  const sql = `UPDATE players SET playerName = '${req.body.playerName}', playerStats = '${req.body.playerStats}', playerTeam = '${req.body.playerTeam}' WHERE playerid = '${req.params.playerid}'`;

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, function (err, result) {
      if (err) {
        return res.status(500).send("Could not update player");
      }

      res.send(`Player with ID ${req.params.playerid} updated successfully.`);
      con.end();
    });
  });
});

// Delete a player by ID
app.delete('/delete/:playerid', (req, res) => {
  const con = connectToDatabase();
  const sql = `DELETE FROM players WHERE playerid = '${req.params.playerid}'`;

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, function (err, result) {
      if (err) {
        return res.status(500).send("Could not delete player");
      }

      res.send("Number of records deleted: " + result.affectedRows);
      con.end();
    });
  });
});

// Get one player by ID
app.get('/select/:playerid', (req, res) => {
  const con = connectToDatabase();
  const sql = `SELECT * FROM players WHERE playerid = '${req.params.playerid}'`;

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, function (err, result) {
      if (err) {
        return res.status(500).send("Could not get player");
      }

      res.send(result);
      con.end();
    });
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});