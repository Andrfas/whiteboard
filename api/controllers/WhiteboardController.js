module.exports = {
    getStickers: function(req, res) {
        var stickers = {};
        TextSticker.find().exec(function(err, textStickers) {
            stickers.textStickers = textStickers;
            ImageSticker.find().exec(function(err, imageStickers) {
                stickers.imageStickers = imageStickers;
                res.json(stickers);
            });
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
        TextSticker.destroy({
            id: req.param('id')
        }).exec(function(err) {

        })
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
    },

    // ImageSticker
    getImageSticker: function(req, res) {
        ImageSticker.findOne({
            id: req.param('stickerId')
        }).exec(function(err, sticker) {
            res.json(sticker);
        })
    },

    createImageSticker: function(req, res) {
        ImageSticker.create({
            posLeft: req.param('posLeft'),
            posTop: req.param('posTop')
        }).exec(function(err, sticker) {
            res.json({
                id:sticker.id
            })
        })
    },

    uploadStickerImage: function(req, res) {
        // var uploadFile = req.file('file');
        // uploadFile.upload({
        //     dirname: '../../assets/images/stickers',
        //     saveAs: uploadFile._files[0].stream.filename
        // },function onUploadComplete (err, files) {
        //     if (err) return res.serverError(err);
        //     //  IF ERROR Return and send 500 error

        //     res.json({status:200,file:files});
        // });
        req.file('file').upload({
            adapter: require('skipper-gridfs'),
            uri: 'mongodb://127.0.0.1:27017/mySiteDB.stickerImage'
        }, function (err, filesUploaded) {
            if (err) return res.negotiate(err);
            ImageSticker.update({
                id: req.param('stickerId')
            }, {
                imageFd: filesUploaded[0].fd
            }).exec(function(err, data){})

            res.json({status:200,file:filesUploaded});
        });
    },

    downloadStickerImage: function(req, res) {
        var blobAdapter = require('skipper-gridfs')({
            uri: 'mongodb://127.0.0.1:27017/mySiteDB.stickerImage'
        });

        blobAdapter.read(req.param('imageFd'), function(err, file) {
            res.contentType('image/png');
            res.send(new Buffer(file));
        })
    },

    updateImageSticker: function(req, res) {
        ImageSticker.update({
            id: req.param('id')
        }, {
            posLeft: req.param('posLeft'),
            posTop: req.param('posTop')
        }).exec(function(err, sticker) {
            res.json();
        })
    },

    deleteImageSticker: function(req, res) {
        var blobAdapter = require('skipper-gridfs')({
            uri: 'mongodb://127.0.0.1:27017/mySiteDB.stickerImage'
        });

        blobAdapter.rm(req.param('imageFd'), function(err) {
            ImageSticker.destroy({
                id: req.param('id')
            }).exec(function(err) {
                res.json();
            })
        })
    }
};

