module.exports = {
    create: function(req, res) {
        Test1.create({
            title: req.param('title')
        }).exec(function(err, test1) {
            Test2.create({
                title: 'abc2',
                owner: test1.id
            }).exec(function(err, test2) {
                res.json(test2)
            })
        })
    },
    update: function(req, res) {
        Test1.find().exec(function(err, data) {
            res.json(data)
        })
        // Test2.update({
        //     id: req.param('id')
        // },{
        //     title:'abc3'
        // }).exec(function(err, test2) {
        //     console.log(test2);
        //     Test1.find().exec(function(err, test1) {
        //         res.json(test1)
        //     })
        // })
    }
}
