module.exports = {
    auth: function(req, res) {
        var authenticated = false;
        if (req.param('email') == 'andrfas@gmail.com' &&
             req.param('password') == '1234') {
            authenticated = true;
            req.session.authenticated = true;
            req.session.admin = true;
        }
        res.json({
            authenticated:authenticated
        })
    },
    getView: function(req, res) {

    }
};

