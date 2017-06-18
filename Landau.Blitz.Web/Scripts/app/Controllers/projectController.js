(function() {
    var projectController = function($scope, $http, $location, $state, $uibModal, $log, $window, $filter, $rootScope, $interval, usSpinnerService, projectFactory, calculatorFactory, projectHttpService) {
        var url = $$ApiUrl + "/contentGenerator";

        $scope.initTabs = function() {

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
                return $('.list').position().left;
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
                    $('.item').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow');
                    $('.scroller-left').hide();
                }
            }

            reAdjust();

            $(window).on('resize', function(e) {
                reAdjust();
            });

            $('.scroller-right').click(function() {

                $('.scroller-left').fadeIn('slow');
                $('.scroller-right').fadeOut('slow');

                $('.list').animate({ left: "+=" + widthOfHidden() + "px" }, 'slow', function() {

                });
            });

            $('.scroller-left').click(function() {

                $('.scroller-right').fadeIn('slow');
                $('.scroller-left').fadeOut('slow');

                $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function() {

                });
            });
        }



        $scope.setProject = function() {

            // alert());
            if (JSON.stringify($scope.currentProject) == "null") {
                $scope.currentProject = projectFactory.initProject();
                projectHttpService.manageProject($http, $scope, usSpinnerService, $scope.currentProject, true);

            } else {

                $scope.currentProject = projectFactory.setData($scope.currentProject);


                $state.go("main.dashboard.project.clientData");
                $scope.initTabs();

                var timer;
                if (!timer) {
                    timer = $interval(function() {
                        console.log("Save project");
                        //console.log('Start silence!');
                        projectHttpService.manageProject($http, $scope, usSpinnerService, projectFactory.getToCurrentProject(), false);
                    }, 30000);
                }
            }

        }

        $scope.$watch('currentProject', function(newValue, oldValue) {
            if (newValue != oldValue) {
                calculatorFactory.calculateData($scope.currentProject);

            }
        }, true);

        $scope.init = function() {
            projectHttpService.getToProjectById($http, $scope, usSpinnerService, 1);

        }
        $scope.init();


        $('#myTabs a').click(function(e) {
            e.preventDefault()

            $(this).tab('show')
        })
    };
    blitzApp.controller("projectController", ["$scope", "$http", "$location", "$state", "$uibModal", "$log", "$window", "$filter", "$rootScope", "$interval", "usSpinnerService", "projectFactory", "calculatorFactory", "projectHttpService", projectController]);
}())