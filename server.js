const Express = require('express');

const hostname = 'localhost';
const port = 3000;
const app = new Express();

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.use(Express.static('dist'));

app.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server running at http://${hostname}:${port}/`); // eslint-disable-line no-console
    }
});
