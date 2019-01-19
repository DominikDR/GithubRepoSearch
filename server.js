const Express = require('express');
const http = require('http');
const path = require('path');
const results = require('./routes/results');

const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = new Express();
const server = new http.Server(app);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

app.use(Express.static('dist'));
app.use('/', results);

server.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server running at http://${hostname}:${port}/`); // eslint-disable-line no-console
    }
});
