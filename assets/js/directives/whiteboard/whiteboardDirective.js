app.directive('whiteboard', ['$compile', 'wbStickerService', function($compile, wbStickerService) {
  return {
    restrict:'E',
    templateUrl: '/js/directives/whiteboard/whiteboard.html',
    scope: {
        wbId:'=wbId'
    },
    controller: function($scope) {

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

        function appendStickers(stickers) {
            angular.element(element[0].querySelector('#wbContent')).append(stickers);
        }
    }
  };
}]);
