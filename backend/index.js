import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
import departementRouter from './routes/departement.js';
import employeRouter from './routes/employe.js';

const app = express ();
app.use (cors ());
app.use (express.json ());
connectToDatabase ();

app.use ('/api/auth', authRouter);
app.use ('/api/departement', departementRouter);
app.use ('/api/employees', employeRouter);

app.listen (process.env.PORT, () => {
  console.log (`Server is running on port ${process.env.PORT}`);
});
