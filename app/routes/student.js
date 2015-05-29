module.exports = function(app) {
    var controller = app.controllers.student;
    var interceptor = app.middlewares.authInterceptor;
    
    app.get('/api/students', controller.getAll);
    app.get('/api/students/:id', controller.getById);
    app.post('/api/students/', controller.create);
    app.put('/api/students/:id', controller.update);
    app.delete('/api/students/:id', controller.remove);
};