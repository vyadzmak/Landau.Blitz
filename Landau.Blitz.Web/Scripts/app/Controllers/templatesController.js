function actionFormatter(value, row, index) {
    var templateId = row.templateId;
    return [
        '<button class="btn btn-info orange-tooltip edit-template" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}


var templatesController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, templatesHttpService, navigatorService) {
    var url = $$ApiUrl + "/templates";
    var data = [];
    templatesHttpService.getToTemplatesList($http, $scope, $state, data, url, usSpinnerService)

    //set templates
    $scope.a = function() {
        var templates = templatesHttpService.getToTemplates();
        navigatorService.setTemplates(templates);
    }

    $scope.updateTemplate = function(row) {

        var templateId = row.templateId;
        var found = $filter('filter')($scope.templates, { Id: templateId }, true);
        var singleTemplate = {};
        if (found.length > 0) {
            singleTemplate = angular.copy(found[0]);
            $scope.gotoAddNewTemplateView(singleTemplate);
        }
    }

    $window.actionEvents = {

        'click .edit-template': function(e, value, row, index) {
            $scope.updateTemplate(row);
        }

    };
    //add new user btn event
    $scope.gotoAddNewTemplateView = function(template = {}) {
        // alert("Click");
        if (template != {}) {
            $scope.isEdit = true;
        }

        $scope.template = template;
        var modalInstance = $uibModal.open({
            templateUrl: 'PartialViews/TemplateManagment.html',
            controller: manageTemplateController,
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function() {
            $log.info(JSON.stringify($scope.template));
            if ($scope.template.Id == undefined) $scope.isEdit = false;
            if (!$scope.isEdit) {
                $scope.template.Id = -1;
            }

            templatesHttpService.manageTemplate($http, $scope, data, url, usSpinnerService, $scope.isEdit);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};

blitzApp.controller("templatesController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "templatesHttpService", "navigatorService", templatesController]);