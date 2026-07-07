import express from "express";
import 'dotenv/config';

const app = express();
const port = parseInt(process.env.PORT, 10);
const version = process.env.VERSION;
const url = process.env.URL+port+"/"+version;

app.listen(port, () => {
  console.log(`Server running at ${url}`);
});

app.get("/v1", (req, res) => {
  res.send("<h1>The BackEnd (_|_)</h1>");
});

/* ROUTES WILL BE MOVED FROM THIS PAGE EXCEPT app.listen */

//GET	/api/v1/listings	Search listings
app.get("/v1/listings", (req, res) => {
  res.send("to start, this will return all lines from a json file");
});

//GET	/api/v1/listings/:id	Listing details
app.get("/v1/listings/:id", (req, res) => {
  res.send("retrieves details of listing");
});

//POST	/api/v1/listings	Create listing
app.post("/v1/listings", (req, res) => {
  console.log("creates a listing");
});

// PATCH	/api/v1/listings/:id	Update listing
app.patch("/v1/listings/:id", (req, res) => {
  console.log("updates a listing");
});

// POST	/api/v1/verifications	Submit verification
app.post("/v1/verifications", (req, res) => {
  console.log("for submitting verifications");
});

// GET	/api/v1/searches	Retrieve saved searches
app.get("/v1/searches", (req, res) => {
  res.send("this will return saved searches");
});

// POST	/api/v1/messages	Send message
app.post("/v1/messages", (req, res) => {
  console.log("for sending messages");
});