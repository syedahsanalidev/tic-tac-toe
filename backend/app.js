const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port = 3000
app.use(bodyParser.json());
var whitelist = ['http://localhost:3001'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', require('./api'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
