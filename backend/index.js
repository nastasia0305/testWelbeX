const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes/main');

const PORT = process.env.PORT ?? 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
