var myapp;
(function () {
    myapp = angular.module('my-employees', []);
    myapp.directive('capitalize', function () {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        // see where the cursor is before the update so that we can set it back
                        var selection = element[0].selectionStart;
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                        // set back the cursor after rendering
                        element[0].selectionStart = selection;
                        element[0].selectionEnd = selection;
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    });

    myapp.directive('myDirective', function () {
        function link(scope, elem, attrs, ngModel) {
            ngModel.$parsers.push(function(viewValue) {
                var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./1-9]*$/;
                // if view values matches regexp, update model value
                if (viewValue.match(reg)) {
                    return viewValue;
                }
                // keep the model value as it is
                var transformedValue = ngModel.$modelValue;
                ngModel.$setViewValue(transformedValue);
                ngModel.$render();
                return transformedValue;
            });
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };      
    });
})();