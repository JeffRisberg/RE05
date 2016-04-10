module.exports = function (app) {
    var express = require('express');
    var tasksRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    tasksRouter.use(bodyParser.json());

    var tasksDB = app.tasksDB;

    tasksRouter.get('/', function (req, res) {
        delete req.query["_"];
        tasksDB.find(req.query).exec(function (error, tasks) {
            res.send({
                'tasks': tasks
            })
        })
    });

    tasksRouter.post('/', function (req, res) {
        // Look for the most recently created record
        tasksDB.find({}).sort({id: -1}).limit(1).exec(function (err, tasks) {

            console.log(req.body.task);
            if (tasks.length != 0)
                req.body.task.id = tasks[0].id + 1;
            else
                req.body.task.id = 1;

            // Insert the new record
            tasksDB.insert(req.body.task, function (err, newTask) {
                res.status(201);
                res.send(JSON.stringify({task: newTask}));
            })
        });
    });

    tasksRouter.get('/:id', function (req, res) {
        tasksDB.find({id: req.params.id}).exec(function (error, tasks) {
            if (tasks.length > 0)
                res.send({
                    'data': tasks[0],
                });
            else {
                res.status(404);
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    tasksRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    tasksRouter.put('/:id', function (req, res) {
        res.send({
            'tasks': {
                id: req.params.id
            }
        });
    });

    tasksRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/tasks', tasksRouter);
};
