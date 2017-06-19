blitzApp.directive("initFromForm66", function($parse) {
    return {
        link: function(scope, element, attrs) {
            var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
                val = attrs.value;
            if (attrs.type === "number") { val = parseInt(val) }
            $parse(attr).assign(scope, val);
        }
    };
});