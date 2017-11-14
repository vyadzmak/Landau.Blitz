var projectController = function($scope, $stateParams, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, $interval, usSpinnerService, projectFactory, calculatorFactory, projectHttpService) {
    var url = $$ApiUrl + "/contentGenerator";



    $scope.counter = 0;
    $scope.initTabs = function() {
        $scope.currentX = 0;
        $("#wrapper").toggleClass("active");
        var hidWidth;
        var scrollBarWidths = 40;

        var widthOfList = function() {
            var itemsWidth = 0;
            $('.list li').each(function() {
                var itemWidth = $(this).outerWidth();
                itemsWidth += itemWidth;
            });
            return itemsWidth;
        };

        var widthOfHidden = function() {
            return (($('.wrapper').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
        };

        var getLeftPosi = function() {
            //return $('.list').position().left;
        };

        var reAdjust = function() {
            if (($('.wrapper').outerWidth()) < widthOfList()) {
                $('.scroller-right').show();
            } else {
                $('.scroller-right').hide();
            }

            if (getLeftPosi() < 0) {
                $('.scroller-left').show();
            } else {
                $('.item').animate({ left: "-=" + getLeftPosi() + "px" }, 'fast');
                $('.scroller-left').hide();
            }
        }

        reAdjust();

        $(window).on('resize', function(e) {
            reAdjust();
        });

        $('.scroller-right').click(function() {
            $scope.counter += 1;
            console.log($scope.counter);
            console.log(widthOfList() + ":" + widthOfHidden() + ":" + getLeftPosi());
            $('.list').animate({ left: "-=" + 200 + "px" }, 'fast', function() {

            });
            if ($scope.counter >= 6) {
                $('.scroller-left').fadeIn('slow');
                $('.scroller-right').fadeOut('slow');
                $('.scroller-left').show();
                $('.scroller-right').hide();
            }

            if ($scope.counter >= 1) {
                $('.scroller-left').show();

            }

        });

        $('.scroller-left').click(function() {
            $scope.counter -= 1;
            console.log($scope.counter);


            $('.list').animate({ left: "+=" + 200 + "px" }, 'fast', function() {

            });
            if ($scope.counter <= 0) {
                $('.scroller-right').fadeIn('slow');
                $('.scroller-left').fadeOut('slow');
                $('.scroller-right').show();
                $('.scroller-left').hide();
            }

            if ($scope.counter >= 1) {

                $('.scroller-right').show();

            }
        });
    }



    $scope.setProject = function() {
        $scope.showProjectMenu = true;
        //$scope.$digest();
        // alert());


        if (JSON.stringify($scope.currentProject) == "null") {
            $scope.currentProject = projectFactory.initProject();
            $scope.currentProject.ProjectStateId = 2;
            projectHttpService.manageProject($http, $scope, usSpinnerService, $scope.currentProject, true);

        } else {

            $scope.currentProject = projectFactory.setData($scope.currentProject);


            $state.go("main.dashboard.project.clientData");
            $scope.initTabs();

            var timer;
            if (!timer) {
                timer = $interval(function() {
                    console.log("Save project");
                    projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);
                }, 60000);
            }
        }

    }


    var handler = function (e) {
        var confirmationMessage = "\o/";

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    $scope.$on('$destroy', function () {
        projectFactory.setActiveBalance();
        projectFactory.setActiveOpiu();
        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);
        window.removeEventListener("beforeunload", handler);
    });
    
    window.addEventListener("beforeunload", handler);

    $scope.$watch('currentProject', function(newValue, oldValue) {
        if (newValue != oldValue) {
            calculatorFactory.calculateData($scope.currentProject);

        }
    }, true);

    $scope.init = function() {
        $scope.projectId = $stateParams.projectId;
        //alert($scope.projectId);


        $scope.initTabs();
        if ($scope.currentProject == undefined || $scope.currentProject.Id == -1 || JSON.stringify($scope.currentProject) == "null") {
            if ($scope.projectId != -1 && $scope.projectId != "")
                projectHttpService.getToProjectById($http, $scope, usSpinnerService, $scope.projectId);

        }

    }
    $scope.init();


    $('#myTabs a').click(function(e) {
        e.preventDefault()

        $(this).tab('show')
    });
};
blitzApp.controller("projectController", ["$scope", "$stateParams", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "$interval", "usSpinnerService", "projectFactory", "calculatorFactory", "projectHttpService", projectController]);