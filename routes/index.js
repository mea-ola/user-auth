var express = require('express'),
    router  = express.Router(),
    jwt     = require('jsonwebtoken')
;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', ensureAuthenticated, function(req, res, next) {
  console.log(req.user);
  var token = jwt.sign({ user_id: req.user.id }, 'secret');
  res.render('user', { name: req.user.displayName, id: req.user.id, token: token });
});

module.exports = router;
