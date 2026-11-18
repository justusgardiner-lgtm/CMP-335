const express = require('express');
let mysql = require('mysql2');

const app = express();
app.use(express.json());

// ---Start of student endpoints---

function connectToDatabase() {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CMP335",
    database: "registration"
  });
  return con;
}
// Endpoint to get all students
app.get('/students', (req, res) => {
  const con = connectToDatabase();

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query("SELECT * FROM students", function (err, result) {
      if (err) {
        return res.status(500).send("Could not fetch students");
      }

      res.send(result);
      con.end();
    });
  });
});
// Endpoint to create a new student
app.post('/students', (req, res) => {
  if (!req.body.studentName || req.body.studentName.trim() === "" || !req.body.studentLastN || req.body.studentLastN.trim() === "") {
    return res.status(400).send("Student name and last name cannot be empty.");
  }

  const con = connectToDatabase();

  const sql = "INSERT INTO students (studentName, studentLastN, studentEmail) VALUES (?, ?, ?)";
  const values = [req.body.studentName, req.body.studentLastN, req.body.studentEmail];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        con.end();
        return res.status(500).send("Could not insert student");
      }

      res.send(`Student ${req.body.studentName} inserted successfully.`);
      con.end();
    });
  });
});
// Endpoint to update a student
app.put('/students/:studentid', (req, res) => {
  const con = connectToDatabase();
  const sql = "UPDATE students SET studentName = ?, studentLastN = ?, studentEmail = ? WHERE studentid = ?";
  const values = [req.body.studentName, req.body.studentLastN, req.body.studentEmail, req.params.studentid];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not update student");
      }

      res.send(`Student with ID ${req.params.studentid} updated successfully.`);
      con.end();
    });
  });
});
// Endpoint to delete a student
app.delete('/students/:studentid', (req, res) => {
  const con = connectToDatabase();
  const sql = "DELETE FROM students WHERE studentid = ?";
  const values = [req.params.studentid];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not delete student");
      }

      res.send("Number of records deleted: " + result.affectedRows);
      con.end();
    });
  });
});
// Endpoint to get a specific student by ID
app.get('/students/:studentid', (req, res) => {
  const con = connectToDatabase();
  const sql = "SELECT * FROM students WHERE studentid = ?";
  const values = [req.params.studentid];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not get student");
      }

      res.send(result);
      con.end();
    });
  });
});

//------------------------- End of student endpoints ---------------------


// ---Start of faculty endpoints---

// Endpoint to get all faculty
app.get('/faculty', (req, res) => {
  const con = connectToDatabase();

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query("SELECT * FROM faculty", function (err, result) {
      if (err) {
        return res.status(500).send("Could not fetch faculty");
      }

      res.send(result);
      con.end();
    });
  });
});

app.get('/faculty/:facultyid', (req, res) => {
  const con = connectToDatabase();
  const sql = "SELECT * FROM faculty WHERE facultyid = ?";
  const values = [req.params.facultyid];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not get faculty");
      }

      res.send(result);
      con.end();
    });
  });
});

app.post('/faculty', (req, res) => {
  if ( !req.body.facultyName || req.body.facultyName.trim() === "" || !req.body.facultyLastN || req.body.facultyLastN.trim() === "") {
    return res.status(400).send("Faculty name and last name cannot be empty.");
  }
  const con = connectToDatabase();
  const sql = "INSERT INTO faculty (facultyName, facultyLastN, facultyEmail) VALUES (?, ?, ?)";
  const values = [req.body.facultyName, req.body.facultyLastN, req.body.facultyEmail];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not insert faculty");
      }

      res.send(`Faculty ${req.body.facultyName} inserted successfully.`);
      con.end();
    });
  });
});

app.put('/faculty/:facultyid', (req, res) => {
  const con = connectToDatabase();
  const sql = "UPDATE faculty SET facultyName = ?, facultyLastN = ?, facultyEmail = ? WHERE facultyid = ?";
  const values = [req.body.facultyName, req.body.facultyLastN, req.body.facultyEmail, req.params.facultyid];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not update faculty");
      }

      res.send(`Faculty with ID ${req.params.facultyid} updated successfully.`);
      con.end();
    });
  });
});

app.delete('/faculty/:facultyid', (req, res) => {
  const con = connectToDatabase();
  const sql = "DELETE FROM faculty WHERE facultyid = ?";
  const values = [req.params.facultyid];

  con.connect(function(err) {
    if (err) {
      return res.status(500).send("Could not connect to database");
    }

    con.query(sql, values, function (err, result) {
      if (err) {
        return res.status(500).send("Could not delete faculty");
      }

      res.send("Number of records deleted: " + result.affectedRows);
      con.end();
    });
  });
});

//------------------------- End of faculty endpoints ---------------------






app.listen(3000, () => {
  console.log('Server is running on port 3000');
});