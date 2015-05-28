var md5 = require('MD5');

module.exports = function(app) {
    var controller = {};
    var User = app.models.user;
    var interceptor = app.middlewares.authInterceptor;

    controller.getAll = function(req, res, next) {
        User.find(function(err, users){
            if(err)
                res.send(err);
            else
                res.status(200).json(users);
        });
    };

    controller.create = function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = md5(req.body.password + '943ea84c56');
        user.admin = req.body.admin;

        user.save(function(error) {
            if (error)
                res.send(error);

            res.json(user);
        });
    };

    controller.authenticate = function(req, res){
        User.findOne({ username: req.body.username, password: md5(req.body.password + '943ea84c56') }, function(error, user){
            if(error)
                res.send(error);

            if (!user)
                res.json({ success: false, message: 'Usuário ou senha inválidos.' });
            else {
                var token = interceptor.signIn(user);

                res.json({
                    success: true,
                    message: 'Seu token expira em 24 horas!',
                    token: token,
                    user: {id: user._id, username: user.username, admin: user.admin}
                });
            }
        });
    };

    controller.getTokenInfo = function(req, res){
        var result = interceptor.result;
        result.user.password = "";
        res.json(result);
    };

    return controller;
};