//Service to get data from employee mvc controller
myapp.service('patientService', function ($http) {

    this.getAllEmployees = function () {

        return $http.get("/Patient/GetPatient");
    }
    this.getAllStateDropdown = function () {
        return $http.get("/Patient/GetStateDropDownList");
    }
    this.getAllCityDropdown = function (StateId) {
        debugger
        return $http.get('/Patient/GetCityDropDownList?StateId=' + StateId);
        //return $http.get("/Employee/GetCityDropDownList");
    }

    //add new patient
    this.save = function (Patient) {
        var request = $http({
            method: 'post',
            url: '/Patient/Insert',
            data: Patient
        });
        return request;
    }

    //update Employee records
    this.update = function (Patient) {
        var updaterequest = $http({
            method: 'post',
            url: '/Patient/Update',
            data: Patient
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateEmpNo) {
        debugger
        return $http.post('/Patient/Delete?PatientId=' + UpdateEmpNo);
    }
    // Get Selected Dropdown List For State
    this.getselectState = function (StateId) {
        debugger
        return $http.get('/Patient/GetSelectedState?StateId=' + StateId);
        //return $http.get("/Employee/GetCityDropDownList");
    }
    this.getselectCity = function (CityId) {
        debugger
        return $http.get('/Patient/GetSelectedCity?CityId=' + CityId);
        //return $http.get("/Employee/GetCityDropDownList");
    }
    //
});