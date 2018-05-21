var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
    res.render('edditeams', { title: 'MS Teams Application' });
});

module.exports = router;
