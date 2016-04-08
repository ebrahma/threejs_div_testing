angular.module('app', ['ngAnimate'])

.controller('FormCtrl', ['$scope', '$animate', function($scope, $animate) {

  // hide success message
  $scope.showSuccessMessage = false;
  $scope.showErrorMessage = false;
  $scope.errorMessage = "Server not repsonding. Please try again later."
  $scope.colorVal = '';
  $scope.completeTFA = false;
  $scope.tfaEnd = false;
  $scope.submitted=false;
  $scope.tfaSubmitted=false;
  $scope.inPost = false;

  $scope.tries = 0;

  $scope.noJSErrors = function(){
    var success_message_elem = angular.element(document.querySelector('#successMessage'));
    $animate.removeClass(success_message_elem, 'startup');
    var errorMessage_elem = angular.element(document.querySelector('#errorMessage'));
    $animate.removeClass(errorMessage_elem, 'startup');
    var tfaMessage_elem = angular.element(document.querySelector('#tfaMessage'));
    $animate.removeClass(tfaMessage_elem, 'startup');inPostIndicator
    var submissionButton_elem = angular.element(document.querySelector('#submissionButton'));
    $animate.removeClass(submissionButton_elem, 'startup');
    var inPostIndicator_elem = angular.element(document.querySelector('#inPostIndicator'));
    $animate.removeClass(inPostIndicator_elem, 'startup');
    var js_required_elem = angular.element(document.querySelector('#jsMessage'));
    $animate.addClass(js_required_elem, 'startup');

  };

  $scope.noJSErrors();
  $scope.enterReaction = function(){
    $scope.shakeItOff();
    $scope.errorMessage = "Please click the login button."
    $scope.showErrorMessage = true;
  };

  $scope.submitLoginForm = function(){
    var isValid = $scope.form.$valid;
    // console.log(isValid);
    // console.log($scope.form.email);
    // console.log($scope.password);

    if (isValid) {
      var email = $scope.email;
      $scope.inPost = true;
      $scope.submitted=true;
      var password = $scope.password;
      console.log(email + ", " + password);

      //post for token here
      var tok_success = false;
      $scope.tries = $scope.tries + 1;
      if(tok_success || $scope.tries > 1) {
        $scope.tries = 0;

        setTimeout(function(){
        $scope.jumpWithJoy();
          $scope.showErrorMessage = false;
          $scope.showSuccessMessage = true;
          $scope.inPost = false;
          $scope.$digest();
          
          setTimeout(function(){
            $scope.showSuccessMessage = false;
            $scope.showTFAMessage = true;
            $scope.completeTFA = true;
            $scope.tfaEnd = true;
            $scope.submitted = true;
            $scope.$digest();
          }, 1000);
        }, 1000);
      } else {
        setTimeout(function(){
            $scope.shakeItOff();
          $scope.errorMessage = "Email or password Incorrect"
          $scope.showErrorMessage = true;

          $scope.inPost = false;
          $scope.submitted=false;
          $scope.$digest();
        }, 1000);
      }


      //$scope.showSuccessMessage = true
      return;
    }

    $scope.errorMessage = "Please correct the following fields.";
    $scope.showErrorMessage = true;

    $scope.shakeItOff();
  }

  $scope.submitTFAForm = function() {
    console.log("hello world");
    $scope.tfaSubmitted = true;
    $scope.tfaInPost = true;
    setTimeout(function(){
      var tfa_success = false;
      $scope.tries = $scope.tries + 1;
      if(tfa_success || $scope.tries > 1) {
        $scope.jumpWithJoy();
        $scope.showTFAMessage = false;
        $scope.showErrorMessage = false;
        $scope.showSuccessMessage = true;
        $scope.tfaInPost = false;
        $scope.$digest();
      } else {
        $scope.shakeItOff();
        $scope.showTFAMessage = false;
        $scope.showErrorMessage = true;
        $scope.tfaSubmitted = false;
        $scope.errorMessage = "Authentication failed, please try again."
        $scope.tfaInPost = false;
        $scope.$digest();

      }

    }, 1000);
  }

  $scope.shakeItOff = function() {
    var err_elem = angular.element(document.querySelector('#input-container'));
    var login_elem = angular.element(document.querySelector('#loginForm'));
    var tfa_elem = angular.element(document.querySelector('#tfaForm'));
    $scope.colorVal = 'redBorder';
    $animate.addClass(login_elem, 'shake', function() {
      $scope.colorVal = 'whiteBorder';
      $scope.$digest();
      $animate.removeClass(login_elem, 'shake');
    });

  }

  $scope.jumpWithJoy = function() {
    console.log("jumping");
    var err_elem = angular.element(document.querySelector('#input-container'));
    var login_elem = angular.element(document.querySelector('#loginForm'));
    var tfa_elem = angular.element(document.querySelector('#tfaForm'));
    $scope.colorVal = 'greenBorder';
    $animate.addClass(login_elem, 'jump', function() {
      $scope.colorVal = 'whiteBorder';
      $scope.$digest();
      $animate.removeClass(login_elem, 'jump');
    });
  }

}]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
