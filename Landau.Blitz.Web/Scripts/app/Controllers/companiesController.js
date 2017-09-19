function companyFormatter(value, row, index) {
    var companyId = row.companyId;
    return [
        '<button class="btn btn-info orange-tooltip edit-company" href="javascript:void(0)" title="Редактировать" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Редактировать компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</button>'
    ].join('');
}

function companyDeleteFormatter(value, row, index) {
    var companyId = row.companyId;
    return [
        '<button class="btn btn-danger orange-tooltip delete-company" href="javascript:void(0)" title="Удалить" style=" text-align: center;" ',
        'data-toggle="tooltip" title="Удалить компанию"  data-placement="bottom">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</button>'
    ].join('');
}

var companiesController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, usSpinnerService, promiseUtils, httpService) {


    var url = $$ApiUrl + "/userclients";
    $scope.companies = [];

    $scope.deleteCompany = function(companyId) {
            var rParams = { id: companyId };
            promiseUtils.getPromiseHttpResult(httpService.deleteRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                //alert(result);

                if (result == "OK") {
                    var ob = $scope.companies.filter(function(item) {
                        return item.Id == companyId;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.companies.indexOf(dElement);

                        if (index != -1) {
                            $scope.companies.splice(index, 1);
                        }
                    }
                }
                $('#companyTable').bootstrapTable('load', $scope.companies);
                $('#companyTable').bootstrapTable('resetView');

            })
        }
        //getRequestById

    var rParams = { userId: $scope.userData.UserId };
    promiseUtils.getPromiseHttpResult(httpService.getRequestById($http, $scope, usSpinnerService, url, rParams)).then(function(result) {
        $scope.companies = JSON.parse(result);
        $window.operateEvents = {
            'click .edit-company': function(e, value, row, index) {
                var ob = $scope.companies.filter(function(item) {
                    return item.Id == row.Id;
                });
                var editElement = ob;
                var modalView = 'PartialViews/Modals/Company/CompanyModal.html';
                var modalController = manageCompanyController;

                if ($scope.companies == undefined) {
                    $scope.companies = [];
                }
                $scope.mElement = ob[0];
                //$scope.showCompanyModal($scope.mElement);
                $scope.mElement.ClientTypeId = 1;
                $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.companies, $scope.mElement);

            },

            'click .delete-company': function(e, value, row, index) {
                var id = row.Id;
                var dialog = BootstrapDialog.confirm({
                    title: 'Предупреждение',
                    message: 'Вы действительно хотите удалить данные?',
                    type: BootstrapDialog.TYPE_WARNING,
                    size: BootstrapDialog.SIZE_SMALL,
                    closable: true,
                    btnCancelLabel: 'Нет',
                    btnOKLabel: 'Да',
                    btnOKClass: 'btn-warning',
                    callback: function(result) {
                        if (result) {
                            $scope.deleteCompany(id);
                        }
                    }
                });
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
            }
        };

        $('#companyTable').bootstrapTable({
            idField: 'Id',
            pagination: true,
            search: true,
            data: $scope.companies,
            showColumns: true,
            columns: [{
                    field: 'Id',
                    title: 'Id',
                    sortable: true
                }, {
                    field: 'Name',
                    title: 'Наименование',
                    sortable: true
                },
                {
                    field: 'Address',
                    title: 'Адрес',
                    sortable: true
                },
                {
                    field: 'RegistrationNumber',
                    title: 'Регистрационный номер',
                    sortable: true
                },
                {
                    field: 'RegistrationDate',
                    title: 'Дата регистрации',
                    sortable: true
                },
                {
                    field: 'ClientTypeName',
                    title: 'Тип компании',
                    sortable: true
                }, {
                    field: 'edit',
                    title: '',
                    formatter: 'companyFormatter',
                    events: 'operateEvents'
                }, {
                    field: 'delete',
                    title: '',
                    formatter: 'companyDeleteFormatter',
                    events: 'operateEvents'
                }
            ]
        });


        var $result = $('#eventsResult');

        $('#companyTable')
            .on('click-row.bs.table', function(e, row, $element) {
                //state go

                var currentIndex = $element.context.cellIndex;
                var totalCount = $element.context.parentElement.cells.length;
                if (totalCount - currentIndex > 2) {
                    $state.go('main.dashboard.companyUsers', { companyId: row.Id });
                    console.log('Event: click-row.bs.table' + JSON.stringify(row.Id));
                }
            })
    })


    //------------------БЛОК ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//
    //add new user btn event
    //имя вьюхи, контроллер, пустой элемент, куда пишем, что пишем
    $scope.addNewModal = function(modalView, modalCtrl, currentElement, elements, element = {}) {

        var url = $$ApiUrl + "/clients";
        if (element != {}) {
            $scope.isEdit = true;
        }

        currentElement = element;
        var modalInstance = $uibModal.open({
            templateUrl: modalView,
            controller: modalCtrl,
            controllerAs: 'vm',
            scope: $scope

        });

        modalInstance.result.then(function() {
            var rParams = {
                data: $scope.mElement,
                config: { contentType: "application/json" }
            };

            if (JSON.stringify(element) == "{}") {


                promiseUtils.getPromiseHttpResult(httpService.postRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    $scope.mElement.Id = JSON.parse(result).Id;
                    $scope.mElement.ClientTypeName = $scope.mElement.CurrentClientType.Description;
                    $scope.mElement.RegistrationDate = JSON.parse(result).RegistrationDate;
                    elements.push($scope.mElement);
                    $scope.mElement = {};
                    $('#companyTable').bootstrapTable('load', $scope.companies);
                    $('#companyTable').bootstrapTable('resetView');

                })


                //send request to POST


            } else {
                //send request to PUT
                promiseUtils.getPromiseHttpResult(httpService.putRequest($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

                    var ob = $scope.companies.filter(function(item) {
                        return item.Id == $scope.mElement.Id;
                    });

                    if (ob.length > 0) {
                        var dElement = ob[0];
                        var index = $scope.companies.indexOf(dElement);

                        if (index != -1) {
                            $scope.companies[index] = JSON.parse(result);
                            $scope.companies[index].ClientTypeName = JSON.parse(result).CurrentClientType.Description;
                        }
                    }
                    $scope.mElement = {};
                    $('#companyTable').bootstrapTable('load', $scope.companies);
                    $('#companyTable').bootstrapTable('resetView');


                })
            }



        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //-----------КОНЕЦ БЛОКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМИ ОКНАМИ---------------------------//


    $scope.showCompanyModal = function() {
        var url = $$ApiUrl + "/clientType";

        var rParams = { userId: $scope.userData.UserId };
        promiseUtils.getPromiseHttpResult(httpService.getRequestById($http, $scope, usSpinnerService, url, rParams)).then(function(result) {

            var types = JSON.parse(result);

            var modalView = 'PartialViews/Modals/Company/CompanyModal.html';
            var modalController = manageCompanyController;

            if ($scope.companies == undefined) {
                $scope.companies = [];
            }
            $scope.mElement = {};
            $scope.mElement.ClientTypes = types;
            $scope.mElement.CurrentClientType = $scope.mElement.ClientTypes[0];
            $scope.mElement.UserCreatorId = $scope.userData.UserId;
            $scope.mElement.ClientCreatorId = $scope.userData.ClientId;

            $scope.addNewModal(modalView, modalController, $scope.mElement, $scope.companies);
        })
    }

};
blitzApp.controller("companiesController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "usSpinnerService", "promiseUtils", "httpService", companiesController]);