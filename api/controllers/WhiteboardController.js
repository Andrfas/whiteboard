module.exports = {
    getStickers: function(req, res) {
        var stickers = {};
        TextSticker.find().exec(function(err, textStickers) {
            stickers.textStickers = textStickers;
            res.json(stickers);
        });

    },
    createTextSticker: function(req, res) {
        TextSticker.create({
            text: req.param('text'),
            posLeft: req.param('posLeft'),
            posTop: req.param('posTop')
        }).exec(function(err, sticker) {
            res.json({
                id:sticker.id
            });
        })
    },
    deleteTextSticker: function(req, res) {

    },
    updateTextSticker: function(req, res) {
        TextSticker.update({
            id: req.param('id')
        },
        {
            text: req.param('text'),
            posLeft: req.param('posLeft'),
            posTop: req.param('posTop')
        }).exec(function(err, sticker) {
            res.json();
        });
    }
};

