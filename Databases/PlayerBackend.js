const express = require('express');
let mysql = require('mysql2');

const app = express();
app.use(express.json());

function connectToDatabase() {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CMP335",
    database: "mydb"
  });
  return con;
}

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

app.post('/insert', (req, res) => {
  const con = connectToDatabase();
  const sql = `INSERT INTO players (playerName, playerStats, playerTeam)
   VALUES ('${req.body.playerName}', '${req.body.playerStats}', '${req.body.playerTeam}')`;

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, function (err, result) {
      if (err) {
        return res.status(500).send("Could not insert player");
      }

      res.send(`Player ${req.body.playerName} inserted successfully.`);
      con.end();
    });
  });
});

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
