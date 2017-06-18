blitzApp.factory('projectFactory', ['$rootScope', 'clientDataInitializer', function($rootScope, clientDataInitializer) {
    var projectFactory = {};
    var currentProject = {};

    //---views data-----//
    var currentClientData = {};
    var currentCreditData = {};
    var currentFinancePlanning = {};
    var currentProjectAnalysis = {};
    var currentBusinessInfo = {};
    var currentFinDataBalance = {};
    var currentFinDataCrossChecking = {};
    var currentFinDataOpiu = {};
    var currentFinDataOdds = {};
    var currentLargeExpenses = {};
    var currentProvision = {};
    var currentDataDamu = {};
    var currentConclusion = {};
    //------end views data ---//


    //-------------------------------init functions --------------------------------------//
    projectFactory.initProject = function() {
        currentProject = {};
        currentProject.Id = -1;
        currentProject.Name = "";
        currentProject.CreatorId = 1;
        currentProject.ClientData = {};
        //clientDataInitializer.setClientData(currentProject);
        currentProject.CreditData = {};
        currentProject.FinancePlanning = {};
        currentProject.ProjectAnalysis = {};
        currentProject.BusinessInfo = {};
        currentProject.FinDataBalance = {};
        currentProject.FinDataCrossChecking = {};
        currentProject.FinDataOpiu = {};
        currentProject.FinDataOdds = {};
        currentProject.LargeExpenses = {};
        currentProject.Provision = {};
        currentProject.DataDamu = {};
        currentProject.Conclusion = {};

        //currentProject.ProjectContent = JSON.stringify(currentProject);
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.setData = function(currentProject) {

        currentProject.ClientData = currentProject.ProjectContent.ClientData;
        currentProject.ClientData.RegistrationDate = new Date(currentProject.ProjectContent.ClientData.RegistrationDate);
        currentProject.ClientData.ReRegistrationDate = new Date(currentProject.ProjectContent.ClientData.ReRegistrationDate);

        currentProject.CreditData = currentProject.ProjectContent.CreditData;;
        currentProject.FinancePlanning = currentProject.ProjectContent.FinancePlanning;
        currentProject.ProjectAnalysis = currentProject.ProjectContent.ProjectAnalysis;
        currentProject.BusinessInfo = currentProject.ProjectContent.BusinessInfo;
        currentProject.FinDataBalance = currentProject.ProjectContent.FinDataBalance;
        currentProject.FinDataBalance.Date = new Date(currentProject.FinDataBalance.Date);
        currentProject.FinDataBalance.PreviousDate = new Date(currentProject.FinDataBalance.PreviousDate);

        currentProject.FinDataCrossChecking = currentProject.ProjectContent.FinDataCrossChecking;
        currentProject.FinDataOpiu = currentProject.ProjectContent.FinDataOpiu;
        currentProject.FinDataOdds = currentProject.ProjectContent.FinDataOdds;
        currentProject.LargeExpenses = currentProject.ProjectContent.LargeExpenses;
        currentProject.Provision = currentProject.ProjectContent.Provision;
        currentProject.DataDamu = currentProject.ProjectContent.DataDamu;
        currentProject.Conclusion = currentProject.ProjectContent.Conclusion;

        currentProject.ProjectContent = {};
        this.currentProject = currentProject;
        return currentProject;
    }

    projectFactory.initClientData = function() {
        currentProject.ClientData = {};
    }

    projectFactory.getToCurrentProject = function() {
            return this.currentProject;
        }
        //-------------------------------end init functions ---------------------------------//

    return projectFactory;

}]);