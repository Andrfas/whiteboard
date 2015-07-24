angular.module('mainApp').service('wbStickerService', ['$http', 'Upload', '$timeout', '$compile', function($http, Upload, $timeout, $compile) {

    /* functions, that are used in outside world
    */
    this.getStickers = function(wbId, scope, callback) {
        var ngStickerArr = [];
        var ngSticker, stickerController;

        $http.get('/whiteboard').success(function(stickers) {
            stickers.textStickers.forEach(function(sticker) {
                ngSticker = angular.element('<text-sticker />');
                $compile( ngSticker)( scope );
                stickerController = ngSticker.controller('textSticker');
                stickerController.setText(sticker.text);
                stickerController.setId(sticker.id);
                stickerController.setWbId(wbId); //TODO set wbId
                stickerController.setPos(sticker.posLeft, sticker.posTop);
                ngStickerArr.push(ngSticker[0]);
            })
            stickers.imageStickers.forEach(function(sticker) {
                ngSticker = angular.element('<image-sticker />');
                $compile( ngSticker)( scope );
                stickerController = ngSticker.controller('imageSticker');
                stickerController.setImageFd(sticker.imageFd);// TODO
                stickerController.setImagePath('/whiteboard/image-sticker/download-image/');// TODO
                stickerController.setId(sticker.id);
                stickerController.setWbId(wbId);
                stickerController.setPos(sticker.posLeft, sticker.posTop);
                ngStickerArr.push(ngSticker[0]);
            })
            callback(ngStickerArr);
        })
    };

    //TODO change posTop and posLeft order
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
            stickerController.setWbId(wbId);
            stickerController.setPos(posLeft, posTop);
            stickerController.setId(data.id);
            callback(ngSticker);
        })
    }

    /* functions, that are used in text-sticker directive
    */
    this.deleteTextSticker = function(wbId, id) {
        $http.post('/whiteboard/text-sticker/delete', {
            wbId:wbId,
            id:id
        })

    }
    this.updateTextSticker = function(wbId, id, text, posTop, posLeft) {
        $http.post('/whiteboard/text-sticker/update', {
            wbId:wbId,
            id:id,
            text:text,
            posTop:posTop,
            posLeft:posLeft
        }).success(function(data) {
            console.log('update text');
        });
    }


    this.createImageSticker = function(scope, wbId, posLeft, posTop, callback) {
        var ngSticker;
        $http.post('/whiteboard/image-sticker/create', {
            wbId:wbId,
            posLeft:posLeft,
            posTop:posTop
        }).success(function(data) {
            ngSticker = angular.element('<image-sticker />');
            $compile( ngSticker )( scope );
            var stickerController = ngSticker.controller('imageSticker');
            stickerController.setWbId(wbId);
            stickerController.setPos(posLeft, posTop);
            stickerController.setId(data.id);
            stickerController.setImagePath('/whiteboard/image-sticker/download-image/');
            callback(ngSticker);
        })
    }

    this.updateImageSticker = function(wbId, id, posLeft, posTop) {
        $http.post('/whiteboard/image-sticker/update-sticker', {
            id: id,
            posLeft: posLeft,
            posTop: posTop
        }).success(function(data) {
            console.log('update image');
        })
    }

    this.updateStickerImage = function(wbId, id, imgUrl, posLeft, posTop) {
        //TODO проапдейтить только изображение в базе
    }

    this.uploadStickerImage = function(wbId, id, file, progressFunc, successFunc) {
        var fileNameSplit = file.name.split('.');
        var fileExtension = '.' + fileNameSplit.pop();
        var fileName = fileNameSplit.join('')+'_'+Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
        Upload.upload({
            url: '/whiteboard/image-sticker/upload-image',
            file: file,
            fileName:fileName,
            fields: {
                stickerId: id
            }
        }).progress(function (evt) {
            progressFunc(evt.loaded, evt.total);
        }).success(function (data, status, headers, config) {
            $timeout(function() {
                console.log(data);
                successFunc(data.file[0].fd);
            });
        }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
        });
    }



    this.deleteImageSticker = function(wbId, id, imageFd) {
        $http.post('/whiteboard/image-sticker/delete', {
            id: id,
            imageFd: imageFd
        }).success(function (data) {
            console.log('deleted (image sticker)')

        })
    }

}])
