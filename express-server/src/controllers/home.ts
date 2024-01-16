import { Router } from 'express';

const homeRouter = Router(); 

homeRouter.get('/hello', (req, res) => {
  res.send('Hello World!');
});

export default homeRouter;