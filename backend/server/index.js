import express from "express";
import 'dotenv/config';

const app = express();
const port = parseInt(process.env.PORT, 10);
const url = process.env.URL+port;

app.listen(port, () => {
  console.log(`Server running at ${url}`);
});

/* ROUTES WILL BE MOVED FROM THIS PAGE EXCEPT app.listen */

//GET ROOT Backend confirmation
app.get("/", (req, res) => {
  res.send("<h1>The BackEnd (_|_)</h1>");
  res.sendStatus(200);
});

//GET	/listings	Search listings
app.get("/listings", (req, res) => {
  res.send("returns all listings");
  res.sendStatus(200);
});

//GET	/listings/:id	Listing details
app.get("/listings/:id", (req, res) => {
  res.send("retrieves details of listing");
  res.sendStatus(200);
});

//POST	/listings	Create listing
app.post("/listings", (req, res) => {
  //res.send("creates a listing");
  res.sendStatus(201);
});

// PATCH	/listings/:id	Update listing
app.patch("/listings/:id", (req, res) => {
  res.send("updates a listing");
  res.sendStatus(200);
});

// POST	/verifications	Submit verification
app.post("/verifications", (req, res) => {
  res.send("for submitting verifications");
  res.sendStatus(200);
});

// GET	/searches	Retrieve saved searches
app.get("/searches", (req, res) => {
  res.send("this will return saved searches");
  res.sendStatus(200);
});

// POST	/messages	Send message
app.post("/messages", (req, res) => {
  res.send("for sending messages");
  res.sendStatus(200);
});
