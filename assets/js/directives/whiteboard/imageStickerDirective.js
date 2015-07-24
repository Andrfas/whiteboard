angular.module('mainApp').directive('imageSticker', ['$document', 'wbStickerService', function($document, wbStickerService) {
  return {
    restrict:'E',
    template: '<span id="closeButton">Close</span><input type="text" ng-model="imgUrl" placeholder="Paste URL"><br>or<br><button ngf-select ng-model="files" ng-show="isEditing">upload image</button><img id="image" ng-src="{{imagePath+imageFd}}" ng-hide="isEditing">',
    scope: {},
    controller: ['$scope', function($scope) {
        this.setImageFd = function(imageFd) {
            $scope.imageFd = imageFd;
        };
        this.setImagePath = function(path) {
            $scope.imagePath = path;
        };
        this.setId = function(id) {
            $scope.id = id;
        };
        this.setWbId = function(wbId) {
            $scope.wbId = wbId;
        };
        this.setPos = function(posLeft, posTop) {
            $scope.setPosition(posLeft, posTop);
        };
        this.setFocus = function() { // TODO change func name to enableEditing
            $scope.enableEditing();
        };
    }],
    link: function(scope, element, attrs) {
        var startX = 0, startY = 0, x = 0, y = 0;
        var image = element[0].querySelector('#image');
        var closeButton = element[0].querySelector('#closeButton');
        var mousedownTime;
        var isDbUpdateNeeded = false;
        var deleteFileWatch;
        scope.imageFd = '';

        scope.isEditing = false;



        function updateUploadProgressBar(current, total) {
            console.log(parseInt(100.0 * current / total))

            // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // $scope.log = 'progress: ' + progressPercentage + '% ' +
            //             evt.config.file.name + '\n' + $scope.log;
        }

        function uploadFinished(imageFd) {
            scope.imageFd = imageFd;
            disableEditing();
        }


        angular.element(image).on('dblclick', function() {
            enableEditing();
            scope.$apply();
        });

        element.css({
           position: 'absolute',
           cursor: 'pointer',
           top:0,
           left:0
        });


        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            mousedownTime = new Date();
            if (scope.isEditing && scope.imageFd != '') return;
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });
        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;
            element.css({
              top: y + 'px',
              left:  x + 'px'
            });
            isDbUpdateNeeded = true;
         }

        function mouseup() {
            if (isDbUpdateNeeded) {
                updateInDb(scope.text, y, x);
                isDbUpdateNeeded = false;
            }
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }



        angular.element(closeButton).on('mousedown', function() {
            mousedownTime = new Date();
            angular.element(closeButton).on('mouseup', function closeMouseup() {
                angular.element(closeButton).off('mouseup', closeMouseup);
                if (new Date() - mousedownTime > 250) {
                    return;
                }

                wbStickerService.deleteImageSticker(scope.wbId, scope.id, scope.imageFd);
                element.remove();
            });
        })


        function updateInDb(text, y, x) {
            wbStickerService.updateImageSticker(scope.wbId, scope.id, x, y);
        }

        scope.setPosition = function(posX, posY) {
            element.css({top: posY+'px', left: posX+'px'});
            x = posX;
            y = posY;
        }

        scope.enableEditing = function() {
            scope.isEditing = true;
            deleteFileWatch = scope.$watch('files', function (newValue, oldValue) {
                if(newValue == oldValue) return;
                wbStickerService.uploadStickerImage(scope.wbId, scope.id, scope.files[0], updateUploadProgressBar, uploadFinished)
            });
        }

        function disableEditing() {
            scope.isEditing = false;
            deleteFileWatch();
        }

        scope.updateImageSticker = function(imageFd) {
            // wbStickerService.updateImageSticker(scope.wbId, scope.id, scope.imageFd, posLeft, posTop)
            // console.log('upload image');
        }
    }
  };
}]);
