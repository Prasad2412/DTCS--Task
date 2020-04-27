myapp.controller('patient-controller', function ($scope, patientService) {

    //Loads all Employee records when page loads
    loadEmployees();

    function loadEmployees() {
        var EmployeeRecords = patientService.getAllEmployees();
        EmployeeRecords.then(function (d) {
            //success
            $scope.Patients = d.data;
        },
        function () {
            alert("Error occured while fetching employee list...!");
        });
    }

    //Check plz alphabets 
    function loadEmployees() {
        var EmployeeRecords = patientService.getAllEmployees();
        EmployeeRecords.then(function (d) {
            //success
            $scope.Patients = d.data;
        },
        function () {
            alert("Error occured while fetching employee list...!");
        });
    }


    //save employee data
    $scope.save = function () {
        var Patient = {
            PatientNo: $scope.PatientNo,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            gender: $scope.gender,
            DateOfBirth: $(".datepickerFuture").val(),
            State: $scope.StateDropDown,
            City: $scope.CityDropDown
        };
        var datetime = $(".datepickerFuture").val();
        if (Patient.FirstName == '' || Patient.DateOfBirth == '' || Patient.LastName == '' || Patient.gender == '' || Patient.State == '' || Patient.City == '') {
            if (Patient.FirstName == '') {
                $('#FirstNameMsg').show();
                $('#AddNew').show();
            } if (Patient.LastName == '') {
                $('#LastNameMsg').show();
                $('#AddNew').show();
            } if (Patient.gender == null) {
                $('#GenderMsg').show();
                $('#AddNew').show();
            } if (Patient.DateOfBirth == '') {
                $('#DOBMsg').show();
                $('#AddNew').show();
            } if (Patient.State == null) {
                $('#StateMsg').show();
                $('#AddNew').show;
            } if (Patient.City == null) {
                $('#CityMsg').show();
                $('#AddNew').show();

            }
            return;
        }


        var saverecords = patientService.save(Patient);
        saverecords.then(function (d) {
            if (d.data.success === true) {
                $('#AddNew').hide();
                loadEmployees();
                alert("Patient added successfully...!");
                $scope.resetSave();
               
            }
            else if (d.data.success === false) { alert("Patient Already Exist...!"); } else { alert("Please all Field are required...!")}
        },
        function () {
            alert("Error occurred while adding Patient...!");
        });
    }
    //reset controls after save operation
    $scope.resetSave = function () {
        $scope.PatientNo = '';
        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.gender = '';
        $('.datepickerFuture').text = '';
        $scope.StateDropDown.val = '';
        $scope.CityDropDown.val = '';
    }


    //update Employee data
    $scope.update = function () {
        var Patient = {
            PatientID: $scope.UpdatePatientNo,
            FirstName: $scope.UpdateFirstName,
            LastName: $scope.UpdateLastName,
            Gender: $scope.updategender,
            DateOfBirth: $(".datepickerFuture").val(),
            State: $scope.StateDropDown,
            City: $scope.CityDropDown
        };

        if (Patient.FirstName == '' || Patient.DateOfBirth == '' || Patient.LastName == '' || Patient.gender == '' || Patient.State == null || Patient.City == null) {
            if (Patient.FirstName == '') {
                $('#FirstNameMsg').show();
                $('#AddNew').show();
            } if (Patient.LastName == '') {
                $('#LastNameMsg').show();
                $('#AddNew').show();
            } if (Patient.gender == null) {
                $('#GenderMsg').show();
                $('#AddNew').show();
            } if (Patient.DateOfBirth == '') {
                $('#DOBMsg').show();
                $('#AddNew').show();
            } if (Patient.State == null) {
                $('#StateMsg').show();
                $('#AddNew').show;
            } if (Patient.City == null) {
                $('#CityMsg').show();
                $('#AddNew').show();

            }
            return;
        }

        var updaterecords = patientService.update(Patient);
        updaterecords.then(function (d) {
            if (d.data.success === true) {
                loadEmployees();
                alert("Patient updated successfully");
                $scope.resetUpdate();
            }
            else {
                alert("Patient Not updated...!");
            }
        },
        function () {
            alert("Error occured while updating Patient record");
        });
    }
    //reset controls after update
    $scope.resetUpdate = function () {
        $scope.UpdatePatientNo = '';
        $scope.UpdateFirstName = '';
        $scope.UpdateLastName = '';
        $scope.updategender = '';
        $scope.UpdateState = '';
        $scope.UpdateCity = '';
    }

    //delete Employee record
    $scope.delete = function (UpdatePatientName) {
        var deleterecord = patientService.delete(UpdatePatientName);
        deleterecord.then(function (d) {
            if (d.data.success === true) {
                loadEmployees();
                alert("Patient deleted succussfully");
            }
            else {
                alert("Patient not deleted.");
            }
        });
    }

    //get single record by ID
    $scope.getForUpdate = function (Patient) {
        $scope.UpdatePatientNo = Patient.PatientId;
        $scope.UpdateFirstName = Patient.FirstName;
        $scope.UpdateLastName = Patient.LastName;
        $scope.updategender = Patient.Gender;
        
        $(".datepickerFuture").val(Patient.DateOfBirth);
        GetSelectStates(Patient.StateId);
        //$scope.States = Patient.StateId;
        GetSelectCity(Patient.CityId)
        //$scope.CityDropDown = Patient.CityId;
    }

    //get data for delete confirmation
    $scope.getForDelete = function (Patient) {
        $scope.UpdatePatientNo = Patient.PatientId;
        $scope.UpdateFullName = Patient.FirstName + ' ' + Patient.LastName;
    }
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = x;
    }


    //Get DropDown List Record
    $scope.GetDropDownData = function () {
        var EmployeeRecords = patientService.getAllStateDropdown();
        EmployeeRecords.then(function (d) {
            $scope.States = d.data;
        },
        function () {
            alert("Error occured while fetching petient list...");
        });
    };

    //
    $scope.GetStateValueForCity = function () {
        var EmployeeRecords = patientService.getAllCityDropdown($scope.StateDropDown);
        EmployeeRecords.then(function (d) {
            debugger
            $scope.Cities = d.data;
        },
        function () {
            alert("Error occured while fetching patient list...");
        });
    }

    //Update Time Selected DropDown List
    function GetSelectStates(StateId) {
        var EmployeeRecords = patientService.getselectState(StateId);
        EmployeeRecords.then(function (d) {
            $scope.States = d.data;
        },
        function () {
            alert("Error occured while fetching patient list...");
        });
    }



    function GetSelectCity(CityId) {
        var EmployeeRecords = patientService.getselectCity(CityId);
        EmployeeRecords.then(function (d) {
            debugger
            $scope.Cities = d.data;
        },
        function () {
            alert("Error occured while fetching patient list...");
        });
    }
    //End
});