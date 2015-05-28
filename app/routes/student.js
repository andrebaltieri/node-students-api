module.exports = function(app) {
    var controller = app.controllers.student;
    var interceptor = app.middlewares.authInterceptor;
    
    app.get('/api/students', interceptor.isAuthenticated, controller.getAll);
    app.get('/api/students/:id', interceptor.isAuthenticated, controller.getById);
    app.post('/api/students/', interceptor.isAuthenticated, controller.create);
    app.put('/api/students/:id', interceptor.isAuthenticated, controller.update);
    app.delete('/api/students/:id', interceptor.isAuthenticated, controller.remove);
};