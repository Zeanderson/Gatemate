import express  from 'express';
import homeRouter from './controllers/weather';

//TODO Needs to be in ENV file
const PORT = 3000;

const app = express();

// Middleware goes here -- IF it does not go above routes it will not work ;)
app.use(express.json());

//TODO app.use('/api/v1/login', loginController);
//TODO app.use('/api/v1/signup', signupController);
app.use('/api/v1/home', homeRouter);
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});