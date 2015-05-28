module.exports = function(app) {
    var controller = {};
    var Student = app.models.student;
    
    controller.getAll = function(req, res) {
        Student.find(function(err, students){
            if(err)
                res.send(err);

            res.status(200).json(students);
        });
    };
    
    controller.getById = function(req, res) {
        Student.findById(req.params.id, function(err, student){
            if(err)
                res.send(err);

            if(student)
                res.json(student);
            else
                res.status(404).json({ message: 'Estudante não encontrado.' });
        });
    };
    
    controller.create = function(req, res) {
        var student = new Student();
        student.name = req.body.name;
        student.email = req.body.email;
        student.phone = req.body.phone;
        student.document = req.body.document;
        
        student.save(function(err){
            if(err)
                res.send(err);

            res.status(201).json(student);
        });
    };
    
    controller.update = function(req, res) {
        Student.findById(req.params.id, function(err, student){
            if(err)
                res.send(err);

            if(!student)
                res.status(404).json({ message: 'Estudante não encontrado.' });

            student.name = req.body.name;
            student.email = req.body.email;
            student.phone = req.body.phone;
            student.document = req.body.document;

            student.save(function(err){
                if(err)
                    res.send(err);

                res.status(200).json(student);
            });
        });
    };
    
    controller.remove = function(req, res) {
        Student.findById(req.params.id, function(err, student){
            if(err)
                res.send(err);

            if(!student)
                res.status(404).json({ message: 'Estudante não encontrado.' });

            student.remove(function(err){
                if(err)
                    res.send(err);

                res.status(200).json(student);
            });
        });
    };
    
    return controller;
}