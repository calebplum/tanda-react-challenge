const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/organisations',
        { target: 'http://localhost:3000/' }
    ));
    app.use(proxy('/auth/',
        { target: 'http://localhost:3000/' }
    ));
    app.use(proxy('/users/',
        { target: 'http://localhost:3000/' }
    ));
    app.use(proxy('/shifts/',
        { target: 'http://localhost:3000/' }
    ));
};
