import express from 'express';
import listingRoutes from './routes/listingRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

app.use(express.json());

//GET ROOT Backend confirmation
app.get("/", (req, res) => {
  res.send("<h1>The BackEnd (_|_)</h1>");
});

app.use('/listings', listingRoutes);
app.use('/searches', searchRoutes);
app.use('/verifications', verificationRoutes);
app.use('/messages', messageRoutes);

export default app;
