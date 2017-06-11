blitzApp.service('templatesHttpService', ["treeGeneratorService", "navigatorService", function(treeGeneratorService, navigatorService) {
    var lTemplates = [];
    //добавляем данные
    function addData(template) {
        var dElement = {};
        dElement.templateId = template.Id;
        dElement.templateName = template.Name;
        dElement.UserCreatorId = template.UserCreatorId;
        dElement.templateCreatorName = template.UserCreatorName;
        dElement.templateCreationDate = template.CreationDate;
        dElement.templateLastUpdateDate = template.LastUpdateDate;
        dElement.templateDescription = template.Description;
        return dElement;
    }


    //get to clients list
    this.getToTemplatesList = function($http, $scope, $state, data, url, usSpinnerService) {
        $scope.templates = [];
        usSpinnerService.spin("spinner-1");
        $scope.loading = true;

        $http.get(url).then(function(response) {
                var rData = JSON.parse(response.data);
                for (var i = 0; i < rData.length; i++) {
                    var template = {};
                    template.Id = rData[i].Id;
                    template.Name = rData[i].Name;
                    template.UserCreatorId = rData[i].UserCreatorId;
                    template.UserCreatorName = rData[i].UserCreatorName;
                    template.Content = rData[i].Content;
                    template.CreationDate = rData[i].CreationDate;
                    template.LastUpdateDate = rData[i].LastUpdateDate;
                    template.Description = rData[i].Description;
                    $scope.templates.push(template);
                    $scope.loading = true;
                    var dElement = addData(template);
                    data.push(dElement);


                }
                lTemplates = $scope.templates;

                $('#templateTable').bootstrapTable({
                    data: data,
                    height: '100%',
                    sortName: 'templateId',
                    sortOrder: 'desc',
                    onPostBody: function() {
                        $('#templateTable').bootstrapTable('resetView');
                    }

                });

                $('[data-toggle="tooltip"]').tooltip()

                var $result = $('#eventsResult');

                $('#templateTable').on('all.bs.table', function(e, name, args) {
                        // console.log('Event:', name, ', data:', args);
                    })
                    .on('click-row.bs.table', function(e, row, $element) {

                        console.log('Event: click-row.bs.table' + JSON.stringify(row.templateId));
                        var templateId = row.templateId;
                        var currentIndex = $element.context.cellIndex;
                        var totalCount = $element.context.parentElement.cells.length;


                        if (totalCount - currentIndex > 1) {
                            $state.go("main.dashboard.editor", { 'templateId': templateId })
                        }
                        // $result.text('Event: click-row.bs.table'+ JSON.stringify(row.userName));
                    })

                $('#templateTable').bootstrapTable('resetWidth');
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                $scope.a();
                window.scope = $scope;

            },
            function(response) {
                showNotify("Успех", "Ошибка при загрузке компаний", "danger");
                $('#templateTable').bootstrapTable('resetWidth');
                usSpinnerService.stop('spinner-1');
                $scope.loading = false;
                window.scope = $scope;
            });
    }

    this.getToTemplates = function() {
            return lTemplates;
        }
        //add or Edit company
    this.manageTemplate = function($http, $scope, data, url, usSpinnerService, isEdit) {
        usSpinnerService.spin("spinner-1");
        var methodType = "POST";
        if (isEdit) {
            methodType = "PUT";
        }
        $scope.template.UserCreatorId = $scope.userData.UserId;
        $http({
                url: url,
                method: methodType,
                contentType: "application/json",
                data: JSON.stringify($scope.template)
            })
            .then(function(response) {
                    $scope.loadData = false;
                    console.log(JSON.stringify(response.data));
                    var template = JSON.parse(response.data);
                    var dElement = addData(template);
                    if (!isEdit) {
                        data.push(dElement);
                        $scope.templates.push(template);
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            if (obj.templateId == dElement.templateId) {
                                data[i] = dElement;
                                break;
                            }
                        }
                        for (var j = 0; j < $scope.templates.length; j++) {
                            if (template.Id == $scope.templates[j].Id) {
                                $scope.templates[j] = template;
                                break;
                            }
                        }
                    }
                    $('#templateTable').bootstrapTable('load', data);
                    usSpinnerService.stop('spinner-1');
                    var notificationT = "добавлен";
                    if (isEdit) notificationT = "обновлен";

                    showNotify("Успех", "Шаблон " + $scope.template.Name + " успешно был " + notificationT, "success");
                    $('#templateTable').bootstrapTable('resetWidth');
                    // success
                },
                function(response) { // optional
                    // failed
                    usSpinnerService.stop('spinner-1');
                    showNotify("Успех", "Ошибка при добавлении/редактировании шаблона", "danger");
                    $('#templateTable').bootstrapTable('resetWidth');
                });
        $('#templateTable').bootstrapTable('resetWidth');
    }


    this.updateTemplate = function($http, $scope, $state, template) {
        var url = $$ApiUrl + "/templates";
        //usSpinnerService.spin("spinner-1");
        var methodType = "PUT";
        var updateTemplate = angular.copy(template);
        updateTemplate.Content = JSON.stringify(updateTemplate.Content);

        $http({
                url: url,
                method: methodType,
                contentType: "application/json",
                data: JSON.stringify(updateTemplate)
            })
            .then(function(response) {

                    var scope = navigatorService.getScope();
                    scope.template = JSON.parse(response.data);
                    scope.template.Content = JSON.parse(scope.template.Content);
                    navigatorService.updateCurrentTemplate(scope.template);
                    treeGeneratorService.generateTreeStructure($scope, $state, $scope.template, false);
                    // success

                    showNotify("Успех", "Шаблон обновлен", "success");
                },
                function(response) { // optional
                    // failed
                    showNotify("Ошибка", "Ошибка обновления шаблона", "danger");
                });
    }
}]);