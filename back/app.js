import express from 'express';
import cors from 'cors';

import { sequelize } from './models/index.js';
import userRouter from './router/user.js';
import postRouter from './router/post.js';

const app = express();

app.set('port', 3065);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('database connect success');
  })
  .catch((error) => {
    console.error(error);
  });

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.send();
});

app.listen(app.get('port'), () => {
  console.log('listening');
});
