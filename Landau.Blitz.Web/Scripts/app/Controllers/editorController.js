var editorController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService) {

    // Event($scope)
    $scope.showToggle = function(node, expanded) {
        console.log(JSON.stringify(node) + " Expanded: " + expanded)
    };
    $scope.showSelected = function(node, selected) {
        console.log(JSON.stringify(node) + " Expanded: " + selected)

    };

    $scope.addTree = function(parentElement, childElement) {
        parentElement.children.push(childElement);
    };

    $scope.selectNode = function(num) {
        $scope.selected = $scope.treedata[num];
    };
    $scope.clearSelected = function() {
        $scope.selected = undefined;
    }

    $scope.init = function() {
        var templateId = $stateParams.templateId;
        navigatorService.setCurrentTemplate(templateId);

        var cTemplate = navigatorService.getCurrentTemplate();
        var o = JSON.stringify(cTemplate);
        if (o == '{}' || cTemplate == undefined || cTemplate == {}) {
            $state.go("main.dashboard.templates");
            return;
        }
        //END TESTS
        var rootElement = {};


        rootElement.label = cTemplate.Name;
        rootElement.id = cTemplate.Id;
        rootElement.children = [];
        rootElement.collapsed = true;

        $scope.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        }
        $scope.dataForTheTree = [];
        $scope.dataForTheTree.push(rootElement);
        //$scope.selectNode(1);
        $scope.selected = $scope.dataForTheTree[0];
        $state.go("main.dashboard.editor.templateDetails");
    }
    $scope.init();
};
blitzApp.controller("editorController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", editorController]);