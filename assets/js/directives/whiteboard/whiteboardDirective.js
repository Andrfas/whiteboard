angular.module('mainApp').directive('whiteboard', ['wbStickerService', function(wbStickerService) {
  return {
    restrict:'E',
    templateUrl: '/js/directives/whiteboard/whiteboard.html',
    scope: {
        wbId:'=wbId'
    },
    link: function(scope, element, attrs) {
        wbStickerService.getStickers(scope.wbId, scope, appendStickers);


        scope.createTextSticker = function() {
            var ngSticker;
            wbStickerService.createTextSticker(scope, scope.wbId, 100, 200, function(ngSticker) {
                appendStickers(ngSticker);
                ngSticker.controller('textSticker').setFocus();
                //TODO append отбирает фокус, желательно устанавливать фокус в createTextSticker
            });
        }

        scope.createImageSticker = function() {
            var ngSticker;
            ngSticker = wbStickerService.createImageSticker(scope, scope.wbId, 100, 200, function(ngSticker) {
                appendStickers(ngSticker);
                ngSticker.controller('imageSticker').setFocus();
                //TODO append отбирает фокус, желательно устанавливать фокус в createTextSticker
            });

        }

        function appendStickers(stickers) {
            angular.element(element[0].querySelector('#wbContent')).append(stickers);
        }
    }
  };
}]);
