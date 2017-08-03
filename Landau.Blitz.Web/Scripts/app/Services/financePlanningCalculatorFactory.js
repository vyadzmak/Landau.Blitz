blitzApp.factory('financePlanningCalculatorFactory', ['$rootScope', function($rootScope) {
    var financePlaningCalculatorFactory = {};

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    financePlaningCalculatorFactory.calculateData = function(currentProject) {
        if (currentProject.FinancePlanning.Table == undefined) return;
        var ob = currentProject.FinancePlanning.Table.filter(function(item) {
            return item.CostItem == 'ПОС';
        });

        var t = "";
        currentProject.FinancePlanning.TotalPos = 0;
        currentProject.FinancePlanning.TotalExpenses = 0;
        currentProject.FinancePlanning.TotalOwnFunds = 0;

        if (ob.length > 0) {
            ob.forEach(function(element) {
                currentProject.FinancePlanning.TotalPos += element.Amount;
            }, this);
        }

        ob = currentProject.FinancePlanning.Table.filter(function(item) {
            return item.Amount;
        });

        if (ob.length > 0) {
            ob.forEach(function(element) {
                currentProject.FinancePlanning.TotalExpenses += element.Amount;
            }, this);
        }


        ob = currentProject.FinancePlanning.Table.filter(function(item) {
            return item.SourceOfFinancing == 'Собственные средства заемщика';
        });

        if (ob.length > 0) {
            ob.forEach(function(element) {
                currentProject.FinancePlanning.TotalOwnFunds += element.Amount;
            }, this);
        }


        var dates = [];
        ob = currentProject.FinancePlanning.Table.filter(function(item) {
            return item.Term;
        });

        if (ob.length > 0) {
            ob.forEach(function(element) {
                dates.push(new Date(element.Term));
            }, this);
        }

        var maxDate = new Date(Math.max.apply(null, dates));
        var minDate = new Date(Math.min.apply(null, dates));

        ob = currentProject.FinancePlanning.Table.filter(function(item) {
            return ((item.SourceOfFinancing == 'Заемные средства (кредит банка)' || item.SourceOfFinancing == 'Заемные средства (частный займ)' || item.SourceOfFinancing == 'Заемные средства (инвестиции третьих лиц)') && item.CostItem == 'ПОС');
        });
        var posFunds = 0;
        if (ob.length > 0) {
            ob.forEach(function(element) {
                posFunds += element.Amount;
            }, this);
        }

        currentProject.FinancePlanning.TotalTerm = monthDiff(minDate, maxDate)
        currentProject.FinancePlanning.TotalBorrowedFunds = currentProject.FinancePlanning.TotalExpenses - currentProject.FinancePlanning.TotalOwnFunds - posFunds;

        //currentProject.FinancePlanning.TotalExpenses = currentProject.FinancePlanning.ExpensesDone + currentProject.FinancePlanning.ExpensesPlanned;

    }



    return financePlaningCalculatorFactory;

}]);