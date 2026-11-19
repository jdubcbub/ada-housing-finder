import 'dotenv/config';
import app from './app.js';

const port = parseInt(process.env.PORT ?? '3001', 10);
const url = process.env.URL ?? `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`Server running at ${url}`);
});
