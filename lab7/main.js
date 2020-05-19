var employees = [];

function idExist(number) {
    'use strict';
    var id;
    for (id in employees) {
        if (employees[id].id === number) {
            return true;
        }
    }
    return false;
}

function getId() {
    'use strict';
    var random = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
  
    while (idExist(random) === true) {
        random = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
    }
    return random;
}

function addZero(date) {
    'use strict';
    if (date < 10) {
        date = '0' + date;
    }
    return date;
}

function getDate() {
    'use strict';
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
               "Sept", "Oct", "Nov", "Dec"];

    var date = new Date();
  
    return days[date.getDay()] + " " + months[date.getMonth()] + " " +
           addZero(date.getDate()) + " " + date.getFullYear();
}

//document.getElementById("submitButton").addEventListener("click", addEmployee);

document.getElementById("submit").onclick = function addEmployee() {
    'use strict';
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dept = document.getElementById("select").value;
    var employeeId = getId();
    var e;
    
    var employee = {
        firstName: 'John',
        lastName: 'Doe',
        department: 'Arts',
        id: '00000000',
        hireDate: 'Sun Jan 01 1000'
    };
  
    for (e in employees) {
        if (employees[e].firstName === firstName && employees[e].lastName === lastName) {
            alert("Employee already exists. Contact your system administrator for additional help.");
            return false;
        }
    }
  
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.department = dept;
    employee.id = employeeId;
    employee.hireDate = getDate();
  
    employees.push(employee);
  
    e = 0;
    for (e in employees) {
        console.log(e + ":");
        console.dir(employees[e]);
    }
    document.getElementById("addMessage").style.visibility = 'visible';
  
    e = 0;
    for (e in employees) {
        //console.log(employees[e]);
        if (employees[e].firstName === firstName && employees[e].lastName === lastName) {
            document.getElementById("resultName").value = "Name: " + employees[e].lastName + ", " + employee.firstName;
            document.getElementById("resultName").style.visibility = 'visible';
            document.getElementById("resultDepartment").value = "Department: " + employees[e].department;
            document.getElementById("resultDepartment").style.visibility = 'visible';
            document.getElementById("resultId").value = "Employee ID: " + employees[e].id;
            document.getElementById("resultId").style.visibility = 'visible';
            document.getElementById("resultDate").value = "Hire Date: " + employees[e].hireDate;
            document.getElementById("resultDate").style.visibility = 'visible';
            document.getElementById("resultTotal").value = "Total Employees: " + employees.length;
            document.getElementById("resultTotal").style.visibility = 'visible';
        }
    }
}