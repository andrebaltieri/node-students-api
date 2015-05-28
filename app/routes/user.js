module.exports = function(app) {
    var controller = app.controllers.user;
    var interceptor = app.middlewares.authInterceptor;

    app.get('/api/users', interceptor.isAdmin, controller.getAll);
    app.post('/api/users', interceptor.isAdmin, controller.create);
    app.post('/api/authenticate', controller.authenticate);
    app.get('/api/gettokeninfo', interceptor.isAdmin, controller.getTokenInfo);
};
