blitzApp.service('companiesHttpService', function() {
    //добавляем данные
    function addData(company) {
        var dElement = {};
        dElement.companyId = company.Id;
        dElement.companyName = company.Name;
        dElement.companyRegistrationNumber = company.RegistrationNumber;
        dElement.companyAddress = company.Address;
        dElement.companyPhoneNumber = company.PhoneNumber;
        dElement.companyAdditionalPhoneNumber = company.AdditionalPhoneNumber;
        dElement.companyContactName = company.ContactName;
        return dElement;
    }


    //get to clients list
    this.getToClientsList = function($http, $scope, $state, data, url, usSpinnerService) {
        $scope.companies = [];
        usSpinnerService.spin("spinner-1");
        $scope.loading = true;

        $http.get(url).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var company = {};
                    company.Id = response.data[i].Id;
                    company.Name = response.data[i].Name;
                    company.RegistrationNumber = response.data[i].RegistrationNumber;
                    company.Address = response.data[i].Address;
                    company.PhoneNumber = response.data[i].PhoneNumber;
                    company.AdditionalPhoneNumber = response.data[i].AdditionalPhoneNumber;
                    company.ContactName = response.data[i].ContactName;
                    $scope.companies.push(company);


                    $scope.loading = true;
                    var dElement = addData(company);
                    data.push(dElement);


                }
                $('#companyTable').bootstrapTable({
                    data: data,
                    height: '100%',
                    sortName: 'companyId',
                    sortOrder: 'desc',
                    onPostBody: function() {
                        $('#companyTable').bootstrapTable('resetView');
                    }

                });

                $('[data-toggle="tooltip"]').tooltip()

                var $result = $('#eventsResult');

                $('#companyTable').on('all.bs.table', function(e, name, args) {
                        // console.log('Event:', name, ', data:', args);
                    })
                    .on('click-row.bs.table', function(e, row, $element) {

                        console.log('Event: click-row.bs.table' + JSON.stringify(row.companyId));
                        var companyId = row.companyId;
                        var currentIndex = $element.context.cellIndex;
                        var totalCount = $element.context.parentElement.cells.length;

                        if (totalCount - currentIndex > 1) {
                            $state.go("main.dashboard.companyDetails", { 'companyId': companyId })
                        }
                        // $result.text('Event: click-row.bs.table'+ JSON.stringify(row.userName));
                    })

                $('#companyTable').bootstrapTable('resetWidth');
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                window.scope = $scope;
            },
            function(response) {
                showNotify("Успех", "Ошибка при загрузке компаний", "danger");
                $('#companyTable').bootstrapTable('resetWidth');
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                window.scope = $scope;
            });
    }

    //add or Edit company
    this.manageCompany = function($http, $scope, data, url, usSpinnerService, isEdit) {
        usSpinnerService.spin("spinner-1");
        var methodType = "POST";
        if (isEdit) {
            methodType = "PUT";
        }

        $http({
                url: url,
                method: methodType,
                contentType: "application/json",
                data: JSON.stringify($scope.company)
            })
            .then(function(response) {
                    $scope.loadData = false;
                    console.log(JSON.stringify(response.data));
                    var company = JSON.parse(response.data);
                    var dElement = addData(company);
                    if (!isEdit) {
                        data.push(dElement);
                        $scope.companies.push(company);
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            if (obj.companyId == dElement.companyId) {
                                data[i] = dElement;
                                break;
                            }
                        }
                        for (var j = 0; j < $scope.companies.length; j++) {
                            if (company.Id == $scope.companies[j].Id) {
                                $scope.companies[j] = company;
                                break;
                            }
                        }
                    }
                    $('#companyTable').bootstrapTable('load', data);
                    usSpinnerService.stop('spinner-1');
                    var notificationT = "добавлена";
                    if (isEdit) notificationT = "обновлена";

                    showNotify("Успех", "Компания " + $scope.company.Name + " успешно была " + notificationT, "success");
                    $('#companyTable').bootstrapTable('resetWidth');
                    // success
                },
                function(response) { // optional
                    // failed
                    usSpinnerService.stop('spinner-1');
                    showNotify("Успех", "Ошибка при добавлении компании", "danger");
                    $('#companyTable').bootstrapTable('resetWidth');
                });
        $('#companyTable').bootstrapTable('resetWidth');
    }
});