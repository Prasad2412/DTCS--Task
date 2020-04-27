myapp.controller('login-controller', function ($scope, loginService) {
    $scope.submit = function () {
        var Login = {
            Email: $scope.Email,
            Password: $scope.Password,
        };
        var login = loginService.login(Login);
        login.then(function (d) {
            if (d.data) {
                //alert("Success.");
                window.location.href = "/Employee/Index"
            }
            else { alert("Username or Password is incorrect."); }
        },
            function () {
                alert("Error occurred while adding User.");
            });
    }
    //save employee data
    $scope.save = function () {
        var Login = {
            Name: $scope.Name,
            Username: $scope.Username,
            Email: $scope.UserEmail,
            Password: $scope.UserPassword,
        };
        var saverecords = loginService.insert(Login);
        saverecords.then(function (d) {
            if (d.data.success === true) {
                alert("User created, login with your credientails.");
            }
            else { alert("User not added."); }
        },
            function () {
                alert("Error occurred while adding User.");
            });
    }
});