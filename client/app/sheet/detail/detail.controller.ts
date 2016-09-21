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

    /*@ngInject*/
  constructor(Sheet, SheetManager, $state, $stateParams, Auth) {
    var that = this;
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
    if (this.sheet._id == null) {
      return this.SheetManager.createSheet(this.sheet)
          .then(() => {
            //this.$state.go('sheet');
          })
          .catch(err => {
            err = err.data;
          });
    } else {
      return this.SheetManager.updateSheet(this.sheet)
          .then(() => {
            //this.$state.go('sheet');
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

  addAnswer(answers) {
    answers.push({
      value: 'new answer',
      right: false
    });
  }
}
