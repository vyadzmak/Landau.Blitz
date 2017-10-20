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

    .state("main.dashboard.logs", {
        url: "/logs",
        templateUrl: "PartialViews/Logs.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Лог";
        }
    })

    .state("main.dashboard.companyUsers", {
        url: "/companyUsers/:companyId",
        templateUrl: "PartialViews/Users.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Пользователи";
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

    .state("main.dashboard.project", {
        url: "/project/:projectId",
        templateUrl: "PartialViews/Project.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Проект";
        }
    })

    .state("main.dashboard.projects", {
        url: "/projects",
        templateUrl: "PartialViews/Projects.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Проекты";
        }
    })

    .state("main.dashboard.project.clientData", {
        url: "/clientData",
        templateUrl: "PartialViews/ClientData.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Данные о клиенте";
        }
    })


    .state("main.dashboard.project.creditData", {
        url: "/creditData",
        templateUrl: "PartialViews/CreditData.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Данные о кредите";
        }
    })

    .state("main.dashboard.project.financePlanning", {
        url: "/financePlanning",
        templateUrl: "PartialViews/FinancePlanning.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "План финансирования";
        }
    })

    .state("main.dashboard.project.projectAnalysis", {
        url: "/projectAnalysis",
        templateUrl: "PartialViews/ProjectAnalysis.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Анализ проекта";
        }
    })


    .state("main.dashboard.project.businessInfo", {
        url: "/businessInfo",
        templateUrl: "PartialViews/BusinessInfo.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Информация о бизнесе";
        }
    })

    .state("main.dashboard.project.finDataBalance", {
        url: "/finDataBalance",
        templateUrl: "PartialViews/FinDataBalance.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Финдата Баланс";
        }
    })


    .state("main.dashboard.project.finDataBalanceTable", {
        url: "/finDataBalanceTable",
        templateUrl: "PartialViews/FinDataBalanceTable.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Финдата Баланс Табличное представление";
        }
    })

    .state("main.dashboard.project.finDataCrossChecking", {
        url: "/finDataCrossChecking",
        templateUrl: "PartialViews/FinDataCrossChecking.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Финдата cross-checking";
        }
    })

    .state("main.dashboard.project.finDataOpiu", {
        url: "/finDataOpiu",
        templateUrl: "PartialViews/FinDataOpiu.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Финдата ОПиУ";
        }
    })


    .state("main.dashboard.project.finDataOdds", {
        url: "/finDataOdds",
        templateUrl: "PartialViews/FinDataOdds.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Финдата ОДДС";
        }
    })

    .state("main.dashboard.project.largeExpenses", {
        url: "/largeExpenses",
        templateUrl: "PartialViews/LargeExpenses.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Крупные расходы";
        }
    })

    .state("main.dashboard.project.provision", {
        url: "/provision",
        templateUrl: "PartialViews/Provision.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Обеспечение";
        }
    })

    .state("main.dashboard.project.dataDamu", {
        url: "/dataDamu",
        templateUrl: "PartialViews/DataDamu.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Данные по гарантии ДАМУ";
        }
    })

    .state("main.dashboard.project.appendix", {
        url: "/appendix",
        templateUrl: "PartialViews/Appendix.html",
        onEnter: function ($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Приложение";
        }
    })

    .state("main.dashboard.project.contractAnalysis", {
        url: "/contractAnalysis",
        templateUrl: "PartialViews/ContractAnalysis.html",
        onEnter: function ($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Приложение";
        }
    })

    .state("main.dashboard.project.conclusion", {
        url: "/conclusion",
        templateUrl: "PartialViews/Conclusion.html",
        onEnter: function($window, $state) {
            if (!$window.sessionStorage.getItem("UserData")) {
                $state.go("main.login");
            }
            $window.document.title = "Заключение";
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
        .state("main.dashboard.settings", {
            url: "/settings",
            templateUrl: "PartialViews/Settings.html",
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