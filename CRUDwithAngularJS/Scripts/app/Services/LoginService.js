myapp.service('loginService', function ($http) {

    //login
this.login = function (Login) {
    var loginrequest = $http({
        method: 'post',
        url: '/Login/Signin',
        data: Login
    });
    return loginrequest;
}
    //add new user
this.insert = function (Login) {
    var signuprequest = $http({
        method: 'post',
        url: '/Login/Insert',
        data: Login
    });
    return signuprequest;
}
});