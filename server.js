const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(3000);
