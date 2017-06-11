blitzApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/login");

    //main page (abstract view)
    $stateProvider
        .state("main", {
            url: "",
            abstract: true,
            template: "<div ui-view></div>",
            data: { pageTitle: "Blitz" },
            onEnter: function($window) { $window.document.title = "Blitz"; }

        })

    //login page
    .state("main.login", {
        url: "/login",
        templateUrl: "PartialViews/Login.html",
        data: { pageTitle: "Авторизация" },
        onEnter: function($window, $cookies, $state) {

            if ($cookies.getObject("UserData")) {
                $window.sessionStorage.setItem("UserData", JSON.stringify($cookies.getObject("UserData")));
                $state.go("main.dashboard");
            }
            $window.document.title = "Авторизация";
        }

    })




    ////dashboard container
    .state("main.dashboard", {
        url: "/dashboard",
        templateUrl: "PartialViews/Dashboard.html",
        onEnter: function($window, $state) {
            // if (!$window.sessionStorage.getItem("UserData")) {
            //     $state.go("main.login");
            // }
            $window.document.title = "Кабинет";
        }
    })

    ///companies managments
    .state("main.dashboard.companies", {
        url: "/companies",
        templateUrl: "PartialViews/Companies.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Компании";
        }
    })

    ///user managments
    .state("main.dashboard.templates", {
        url: "/templates",
        templateUrl: "PartialViews/Templates.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Шаблоны";
        }
    })

    .state("main.dashboard.editor", {
        url: "/editor/:templateId",
        templateUrl: "PartialViews/Editor.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Шаблоны";
        }
    })

    .state("main.dashboard.catalogs", {
        url: "/catalogs",
        templateUrl: "PartialViews/Catalogs.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Справочники";
        }
    })

    .state("main.dashboard.catalogFieldDetails", {
        url: "/catalogFieldDetails/:catalogId",
        templateUrl: "PartialViews/CatalogFieldDetails.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Поля справочника";
        }
    })

    .state("main.dashboard.editor.templateDetails", {
        url: "/templateDetails",
        templateUrl: "PartialViews/TemplateDetails.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Шаблон";
        }
    })

    .state("main.dashboard.editor.sheetDetails", {
        url: "/templateDetails/:sheetId",
        templateUrl: "PartialViews/SheetDetails.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Страница";
        }
    })


    .state("main.dashboard.editor.blockDetails", {
        url: "/blockDetails/:blockId",
        templateUrl: "PartialViews/BlockDetails.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Блок";
        }
    })

    .state("main.dashboard.editor.questionDetails", {
        url: "/questionDetails/:questionId",
        templateUrl: "PartialViews/QuestionDetails.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Вопрос";
        }
    })

    .state("main.dashboard.editor.fieldDetails", {
        url: "/fieldDetails/:fieldId",
        templateUrl: "PartialViews/FieldDetails.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Поле";
        }
    })

    .state("main.dashboard.editor.elementDetails", {
            url: "/elementDetails/:elementId",
            templateUrl: "PartialViews/ElementDetails.html",
            onEnter: function($window, $state) {
                if (!$window.sessionStorage.getItem("UserData")) {
                    $state.go("main.login");
                }
                $window.document.title = "Элемент";
            }
        })
        ///user managments
        .state("main.dashboard.systemSettings", {
            url: "/systemSettings",
            templateUrl: "PartialViews/SystemSettings.html",
            onEnter: function($window, $state) {
                if (!$window.sessionStorage.getItem("UserData")) {
                    $state.go("main.login");
                }
                $window.document.title = "Настройки";
            }
        })
        ///user managments
        .state("main.dashboard.adminStatistics", {
            url: "/adminStatistics",
            templateUrl: "PartialViews/AdminStatistics.html",
            onEnter: function($window, $state) {
                if (!$window.sessionStorage.getItem("UserData")) {
                    $state.go("main.login");
                }
                $window.document.title = "Статистика";
            }
        })
        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
});