const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const MacaddressValidation = require('../middlewares/MacaddressValidation');
const TaskValidation = require('../middlewares/TaskValidation');


router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);
router.put('/:id/:done', TaskController.done);
router.get('/filter/all', MacaddressValidation, TaskController.all);
router.get('/filter/late', MacaddressValidation, TaskController.late);
router.get('/filter/today', MacaddressValidation, TaskController.today);
router.get('/filter/week', MacaddressValidation, TaskController.week);



module.exports = router;