import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
import departementRouter from './routes/departement.js';
import userRouter from './routes/user.js'; // Assurez-vous que le nom est correct

const app = express();

app.use(cors());
app.use(express.json());
connectToDatabase();

// Utilisation des routes
app.use('/api/auth', authRouter);
app.use('/api/departement', departementRouter);
app.use('/api/users', userRouter); // Il est préférable d'utiliser le pluriel pour les routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
