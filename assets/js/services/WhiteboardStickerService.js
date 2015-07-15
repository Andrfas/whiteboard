app.service('wbStickerService', ['$compile', '$http', function($compile, $http) {

    /* functions, that are used in outside world
    */
    this.getStickers = function(wbId, scope, callback) {
        var ngStickerArr = [];
        var ngSticker, stickerController;

        $http.get('/whiteboard').success(function(stickers) {
            stickers.textStickers.forEach(function(sticker) {
                ngSticker = angular.element('<text-sticker />');
                $compile( ngSticker )( scope );
                stickerController = ngSticker.controller('textSticker');
                stickerController.setText(sticker.text);
                stickerController.setId(sticker.id);
                stickerController.setWbId(0); //TODO set wbId
                stickerController.setPos(sticker.posLeft, sticker.posTop);
                ngStickerArr.push(ngSticker[0]);
            })
            callback(ngStickerArr);
        })
    };

    this.createTextSticker = function(scope, wbId, posTop, posLeft, callback) {
        var ngSticker;
        $http.post('/whiteboard/text-sticker/create', {
            wbId:wbId,
            text:'',
            posTop:posTop,
            posLeft:posLeft
        }).success(function(data) {
            ngSticker = angular.element('<text-sticker />');
            $compile( ngSticker )( scope );
            var stickerController = ngSticker.controller('textSticker');
            stickerController.setWbId(wbId); //TODO set wbId
            stickerController.setPos(posLeft, posTop);
            stickerController.setId(data.id);
            //stickerController.setFocus();
            callback(ngSticker);
        })
    }

    /* functions, that are used in text-sticker directive
    */
    this.deleteTextSticker = function(wbId, id) {

    }
    this.updateTextSticker = function(wbId, id, text, posTop, posLeft) {
        $http.post('/whiteboard/text-sticker/update', {
            wbId:wbId,
            id:id,
            text:text,
            posTop:posTop,
            posLeft:posLeft
        }).success(function(data) {
            console.log('update');
        });
    }



}])
