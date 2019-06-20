exports.load_home_page = function(req, res) {
  res.render('index', { title: 'Home', 'user': req.user});
}
