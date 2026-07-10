import 'dotenv/config';
import express from 'express';
import listingRoutes from './routes/listingRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
const port = parseInt(process.env.PORT!, 10);
const url = process.env.URL!+port;

app.use(express.json());

//GET ROOT Backend confirmation
app.get("/", (req, res) => {
  res.send("<h1>The BackEnd (_|_)</h1>");
});

app.use('/listings', listingRoutes);
app.use('/searches', searchRoutes);
app.use('/verifications', verificationRoutes);
app.use('/messages', messageRoutes);

app.listen(port, () => {
  console.log(`Server running at ${url}`);
});
