const express = require('express');
const app = express();
const router = require('./src/routes/index');

const cors = require('cors');
const morgan = require('morgan');

const port = 8080;

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/v1/api', router);

app.set('port', process.env.PORT || port);

if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log(`Server on port ${app.get('port')}`);
    });
}

module.exports = app;
