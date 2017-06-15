blitzApp.service('clientDataInitializer', ['$rootScope', function($rootScope) {
    this.setClientData = function(currentProject) {
        currentProject.ClientData.OrganizationName = "";
        currentProject.ClientData.RegistrationDate = "";
    }
}]);