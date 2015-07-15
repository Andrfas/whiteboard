app.directive('textSticker', ['$document', 'wbStickerService', function($document, wbStickerService) {
  return {
    restrict:'E',
    template: '<span id="closeButton">Close</span><p id="textPane" ng-hide="isTextTyping">Text: {{text}}</p><textarea id="textArea" text="text" ng-model="text" ng-show="isTextTyping"></textarea>',
    scope: {
        stickerText:'=text'
    },
    controller: function($scope) {
        this.setText = function(text) {
            $scope.text = text;
        };
        this.setId = function(id) {
            $scope.id = id;
        };
        this.setWbId = function(wbId) {
            $scope.wbId = wbId;
        };
        this.setPos = function(posLeft, posTop) { // TODO finish this functions
            $scope.setPosition(posLeft, posTop);
        };
        this.setFocus = function() {
            $scope.setFocus();
        };
    },
    link: function(scope, element, attrs) {
        var startX = 0, startY = 0, x = 0, y = 0;
        var pane = element[0].querySelector('#textPane');
        var area = element[0].querySelector('#textArea');
        var closeButton = element[0].querySelector('#closeButton');
        var mousedownTime;
        var isDbUpdateNeeded = false;

        scope.isTextTyping = false;


        angular.element(pane).on('dblclick', function() {
            scope.isTextTyping = true;
            scope.$apply();
            area.focus();
        });

        angular.element(area).on('blur', function() {
            scope.isTextTyping = false;
            scope.$apply(); // is it normal to call apply here
            updateInDb(scope.text, y, x);
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
            if (scope.isTextTyping) return;
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
                wbStickerService.deleteTextSticker(scope.wbId, scope.id);
                element.remove();
            });
        })


        function updateInDb(text, y, x) {
            wbStickerService.updateTextSticker(scope.wbId, scope.id, text, y, x);
        }

        scope.setPosition = function(posX, posY) {
            element.css({top: posY+'px', left: posX+'px'});
            x = posX;
            y = posY;
        }

        scope.setFocus = function() {
            scope.isTextTyping = true;
            area.focus();
        }

    }
  };
}]);
