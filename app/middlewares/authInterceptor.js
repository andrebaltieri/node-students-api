var jwt = require('jsonwebtoken');

module.exports = function(app) {
    var authInterceptor = {};

    authInterceptor.result = {};

    authInterceptor.isAuthenticated = function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, '943ea84c56', function(err, decoded) {
                if (err) {
                    res.status(401).json({ success: false, message: 'Ops, token inválido.' });
                } else {
                    authInterceptor.result = { success: true, user: decoded };
                    next();
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Forneça um token.' });
        }
    };

    authInterceptor.isAdmin = function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, '943ea84c56', function(err, decoded) {
                if (err) {
                    res.status(401).json({ success: false, message: 'Ops, token inválido.' });
                } else {
                    if(decoded.admin){
                        authInterceptor.result = { success: true, user: decoded };
                        next();
                    }else{
                        res.status(401).json({ success: false, message: 'Página restrita para administradores' });
                    }
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Ops, não encontramos nenhum token em sua requisição!' });
        }
    };

    authInterceptor.signIn = function(user){
      return jwt.sign(user, '943ea84c56', {
          expiresInMinutes: 1440 // expires in 24 hours
      });
    };

    return authInterceptor;
};