'use strict';

(function() {
  angular.module('ngJScrollPane', []);

  angular.module('ngJScrollPane').directive('scrollPane', [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        transclude: true,
        template: '<div class="scroll-pane"><div ng-transclude class="scroll-container"></div></div>',
        link: function($scope, $elem, $attrs) {
          var cal_width;
          var config, fn;
          config = {};
          $scope.$on('albumCompleteEvent', function(event, args) {

            cal_width = (args.albumLength * 420) + 'px';
            $('.scroll-container').css('width', cal_width);
            if ($attrs.scrollConfig) {
              config = $scope.$eval($attrs.scrollConfig);
            }
            fn = function() {
              return jQuery('#' + $attrs.id).jScrollPane(config);
            };
            if ($attrs.scrollTimeout) {
              return $timeout(fn, $scope.$eval($attrs.scrollTimeout));
            } else {
              return fn();
            }
          });
          if ($attrs.directInitiate) {
            if ($attrs.scrollConfig) {
              config = $scope.$eval($attrs.scrollConfig);
            }
            fn = function() {
              return jQuery('#' + $attrs.id).jScrollPane(config);
            };
            if ($attrs.scrollTimeout) {
              return $timeout(fn, $scope.$eval($attrs.scrollTimeout));
            } else {
              return fn();
            }
          }
        },
        replace: true
      };
    }
  ]);

}).call(this);
