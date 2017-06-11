var editorController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, navigatorService, treeGeneratorService) {
    $scope.clickOnTree = function(node) {
        var type = node.id[0];
        var index = node.id[1];

        switch (type) {
            case 't':
                $state.go('main.dashboard.editor.templateDetails')
                break;


            case 's':
                $state.go('main.dashboard.editor.sheetDetails', { 'sheetId': index });
                break;

            case 'b':
                $state.go('main.dashboard.editor.blockDetails', { 'blockId': index });
                break;

            case 'q':
                $state.go('main.dashboard.editor.questionDetails', { 'questionId': index });
                break;

            case 'f':
                $state.go('main.dashboard.editor.fieldDetails', { 'fieldId': index });
                break;

            case 'e':
                $state.go('main.dashboard.editor.elementDetails', { 'elementId': index });
                break;
        }

    }

    $scope.dataForTheTree = [];
    // Event($scope)
    $scope.showToggle = function(node, expanded) {
        // console.log(JSON.stringify(node) + " Expanded: " + expanded)
        $scope.clickOnTree(node);
    };
    $scope.showSelected = function(node, selected) {
        // console.log(JSON.stringify(node) + " Expanded: " + selected)
        $scope.clickOnTree(node);
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

    $scope.$watch('dataForTheTree', function(newValue, oldValue) {
        if (newValue != oldValue) {

            $scope.dataForTheTree = navigatorService.getDataForTheTree();
        }
    }, true);

    $scope.$on('tree:updated', function(event, data) {

        if (data != undefined) {
            $scope.dataForTheTree = navigatorService.getDataForTheTree();
        }
        //alert(JSON.stringify(data));
    });

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

        navigatorService.setScope($scope);
        treeGeneratorService.generateTreeStructure($scope, $state, cTemplate, true);
        //$scope.selectNode(1);


    }
    $scope.init();
};
blitzApp.controller("editorController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "navigatorService", "treeGeneratorService", editorController]);