import express from 'express';

import userRouter from './router/user';
import postRouter from './router/post';

const app = express();

app.set('port', 3060);

app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.send();
});

app.listen(app.get('port'), () => {
  console.log('listening');
});
