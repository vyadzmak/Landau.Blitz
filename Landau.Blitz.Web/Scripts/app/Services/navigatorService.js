blitzApp.service('navigatorService', ['$rootScope', function($rootScope) {
    var templates = [];
    var currentTemplate = {};

    var sheets = [];
    var currentSheet = {};

    var blocks = [];
    var currentBlock = {};

    var questions = [];
    var currentQuestion = {};

    var fields = [];
    var currentField = {};

    var elements = [];
    var currentElement = {};
    var scope = {};
    var dataForTheTree = [];

    var catalogs = [];
    var currentCatalog = {};

    var catalogFields = [];
    var currentCatalogField = {};

    //--------------------GET FUNCTIONS-----------------------------------//
    this.getScope = function() {
        return scope;
    }

    this.getCatalogs = function() {
        return catalogs;
    }

    this.getCurrentCatalog = function() {
        return currentCatalog;
    }

    this.getCatalogFields = function() {
        return catalogs;
    }


    this.getDataForTheTree = function() {
        return dataForTheTree;
    };

    this.getTemplates = function() {
        return templates;
    };

    this.getCurrentTemplate = function() {
        return currentTemplate;
    };

    this.getSheets = function() {
        return sheets;
    };

    this.getCurrentSheet = function() {
        return currentSheet;
    };

    this.getBlocks = function() {
        return blocks;
    };

    this.getCurrentBlock = function() {
        return currentBlock;
    };

    this.getQuestions = function() {
        return questions;
    };

    this.getCurrentQuestion = function() {
        return currentQuestion;
    };

    this.getFields = function() {
        return fields;
    };

    this.getCurrentField = function() {
        return currentField;
    };

    this.getElements = function() {
        return elements;
    };

    this.getCurrentElement = function() {
        return currentElement;
    };

    //--------------------END FUNCTION GET ------------------------------//

    //---------------------DROP FUNCTIONS------------------------------//

    this.dropDataForTheTree = function() {
        dataForTheTree = [];
    };

    this.dropTemplates = function() {
        templates = [];
    };

    this.dropCurrentTemplate = function() {
        currentTemplate = {};
    };

    this.dropSheets = function() {
        sheets = [];
    };

    this.dropCurrentSheet = function() {
        currentSheet = {};
    };

    this.dropBlocks = function() {
        blocks = [];
    };

    this.dropCurrentBlock = function() {
        currentBlock = {};
    };

    this.dropQuestions = function() {
        questions = [];
    };

    this.dropCurrentQuestion = function() {
        currentQuestion = {};
    };

    this.dropFields = function() {
        fields = [];
    };

    this.dropCurrentField = function() {
        currentField = {};
    };

    this.dropElements = function() {
        elements = [];
    };

    this.dropCurrentElement = function() {
        currentElement = {};
    };

    this.dropAll = function() {
            templates = [];
            currentTemplate = {};
            sheets = [];
            currentSheet = {};
            blocks = [];
            currentBlock = {};
            questions = [];
            currentQuestion = {};
            fields = [];
            currentField = {};
            elements = [];
            currentElement = {};

        }
        //---------------------END DROP FUNCTIONS--------------------------//

    //---------------------SET FUNCTIONS------------------------------//

    this.setScope = function(_scope) {
        scope = _scope;
    }
    this.setTemplates = function(_templates) {
        templates = _templates;
        for (var i = 0; i < templates.length; i++) {
            templates[i].Content = JSON.parse(templates[i].Content);
        }
    };

    this.setCurrentTemplate = function(templateId) {
        for (i = 0; i < templates.length; i++) {
            if (templateId == templates[i].Id) {
                currentTemplate = templates[i];
                if (currentTemplate != null)
                    sheets = currentTemplate.Content.Sheets;
                break;
            }
        }

    };


    this.setCatalogs = function(_catalogs) {
        caalogs = _catalogs;
        for (var i = 0; i < catalogs.length; i++) {
            catalogs.Fields = JSON.parse(catalogs[i].Fields);
        }
    };

    this.setCurrentCatalog = function(catalogId) {
        for (i = 0; i < catalogs.length; i++) {
            if (catalogId == catalogs[i].Id) {
                currentCatalog = catalogs[i];
                if (currentCatalog != null)
                    catalogFields = currentCatalog.Fields;
                break;
            }
        }

    };

    this.updateCurrentTemplate = function(template) {
        for (i = 0; i < templates.length; i++) {
            if (template.Id == templates[i].Id) {
                templates[i] = template;
                currentTemplate = templates[i];
                if (currentTemplate != null)
                    sheets = currentTemplate.Content.Sheets;
                break;
            }
        }

    };

    this.setSheets = function(_sheets) {
        sheets = _sheets;
    };


    this.setDataForTheTree = function(_data) {
        dataForTheTree = _data;
        $rootScope.$broadcast('tree:updated', _data);
    };


    this.setCurrentSheet = function(sheetId) {
        for (i = 0; i < sheets.length; i++) {
            if (sheetId == sheets[i].Id) {
                currentSheet = sheets[i];
                blocks = currentSheet.Blocks;
                break;
            }
        }
    };

    this.setBlocks = function(_blocks) {
        blocks = _blocks;
    };

    this.setCurrentBlock = function(blockId) {
        for (i = 0; i < blocks.length; i++) {
            if (blockId == blocks[i].Id) {
                currentBlock = blocks[i];
                questions = currentBlock.Questions;
                break;
            }
        }
    };

    this.setQuestions = function(_questions) {
        questions = _questions;
    };

    this.setCurrentQuestion = function(questionId) {
        for (i = 0; i < questions.length; i++) {
            if (questionId == questions[i].Id) {
                currentQuestion = questions[i];
                fields = currentQuestion.Fields;
                break;
            }
        }
    };

    this.setFields = function(_fields) {
        fields = _fields;
    };

    this.setCurrentField = function(fieldId) {
        for (i = 0; i < fields.length; i++) {
            if (fieldId == fields[i].Id) {
                currentField = fields[i];
                elements = currentField.Elements;
                break;
            }
        }
    };

    this.setElements = function(_elements) {
        elements = _elements;
    };

    this.setCurrentElement = function(elementId) {
        for (i = 0; i < elements.length; i++) {
            if (elementId == elements[i].Id) {
                currentElement = elements[i];
                break;
            }
        }
    };

    //---------------------END SET FUNCTIONS--------------------------//

}]);