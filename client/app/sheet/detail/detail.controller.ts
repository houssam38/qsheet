'use strict';

interface Sheet {
  _id: string;
  name: string;
  creator: string;
  questions: Object[];
}

export default class SheetDetailController {
  sheet: Sheet = {
    _id: null,
    name: '',
    creator: '',
    questions: []
  };
  SheetManager;
  $state;
  ngDialog;
  $timeout;

    /*@ngInject*/
  constructor(Sheet, SheetManager, $state, $stateParams, Auth, dragulaService, ngDialog, $timeout) {
    var that = this;
    this.ngDialog = ngDialog;
    this.$timeout = $timeout;
    this.SheetManager = SheetManager;
    this.sheet = {
      _id : null,
      name: this.sheet.name,
      creator: '',
      questions: [{
        name: 'Is it your first question ?',
        order : 1,
        answers: [{
          value: 'yes',
          right: true
        },{
          value: 'no',
          right: false
        }]
      }]
    };

    Auth.getCurrentUser().then( function(res) {
      that.sheet.creator = res._id;
    });

    this.$state = $state;
    if($stateParams.sheetId != undefined) {
      Sheet.get({ 'id': $stateParams.sheetId }, function(response) {
        that.sheet = response;
      }, function(err) {

      });
    }
  }

  save() {
    console.log('save');
    var that = this;
    if (this.sheet._id == null) {
      return this.SheetManager.createSheet(this.sheet)
          .then(() => {
            this.$state.go('sheet');
          })
          .catch(err => {
            err = err.data;
          });
    } else {
      return this.SheetManager.updateSheet(this.sheet)
          .then(() => {
            that.ngDialog.open({
              template:  '<i class="material-icons left success">done</i> <span class="success-text">Your sheet has been saved !</span>',
              plain: true,
              className: 'ngdialog-theme-default',
              controller: function() {
                that.$timeout(function(){that.ngDialog.close()}, 2500);
              }
            });
          })
          .catch(err => {
            err = err.data;
          });
    }
  }

  addQuestion() {
    this.sheet.questions.push({
      name: 'Want more ?',
      order : this.sheet.questions.length + 1,
      answers: [{
        value: 'yes',
        right: true
      },{
        value: 'no',
        right: false
      }]
    })
  }

  deleteQuestion(key) {
    var that = this;
    that.ngDialog.openConfirm({
      template: '<p>Are you sure you want to delete this question?</p>'+
                '<div class="ngdialog-buttons">'+
                    '<button type="button" class="waves-effect waves-light btn ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>&nbsp;'+
                    '<button type="button" class="waves-effect waves-light btn ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>'+
                '</div>',
      plain: true,
      className: 'ngdialog-theme-default'
    }).then(function (value) {
      that.sheet.questions.splice(key, 1);
    }, function (value) {
      //Do something
    });
  }

  addAnswer(answers) {
    answers.push({
      value: 'new answer',
      right: false
    });
  }
}
