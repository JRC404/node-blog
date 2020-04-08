const { Router } = require('express');

const router = Router();
const indexRoutes = require('../controllers/index');

router.get('/', indexRoutes.getIndex);

router.get('/write', indexRoutes.getWrite);
router.post('/write', indexRoutes.postWrite);

router.post('/posts/:id', indexRoutes.postIndex);
router.post('/edit/:id', indexRoutes.postEdit);
router.post('/delete/posts/:id', indexRoutes.postDelete);

router.get('/signup', indexRoutes.getSignup);
router.post('/signup', indexRoutes.postSignup);

router.get('/comment', indexRoutes.getComment);
router.post('/comment', indexRoutes.postComment);

router.get('/dean', indexRoutes.getDean);

module.exports = router;
