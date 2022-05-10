// const button = document.getElementById('submitButton');
// const firstNameInput = document.getElementById('firstName');
// const lastNameInput = document.getElementById('lastName');
// const emailInput = document.getElementById('email');


// button.addEventListener('click', () => {
//     const valid = validateField('firstName', 'First name is required') &&
//     validateField('lastName', 'Last name is required') &&
//     validateField('email', 'Email is required') &&
//     validateEmail('Email must contain "@" and "."');
    

//     if (valid) {
//         console.log(firstNameInput.value + "\n" + lastNameInput.value + "\n" + emailInput.value);
//     }
// });




let name = "Numele este introdus gresit";
let surname = "Prenumele este introdus gresit";
let email = "Email-ul este introdus gresit";
let phone = "Numarul este introdus gresit(necesar +373 sau 0)"
function validateNameSurname(parametru) {
    if(parametru.length <= 3 || parametru.length >= 20) {
        return false;
    } else {
        return true;
    }
}

function checker(element,parametru,text) {
    if(!validateNameSurname(parametru)) {
        element.text(`${text}`);
    }else {
        element.text("");
    }
}

function validateEmail() {
    if($("#email").val().includes("@") && $("#email").val().includes(".")) {
        return true;
    } else {
        return false;
    }
}

function checkMail(text) {
    if(validateEmail() == false) {
        $("#emailError").text(`${text}`);
    }else {
        $("#emailError").text("");
    }
}

function phoneValidate(value) {
    if(value[0] == "+" && value[1] == "3" && value[2] == "7" && value[4] == "3" && value.length == 12 || value[0] == "0" && value.length == 9) {
        return true;
    } else {
        return false;
    }
}

function validateEducation(value) {
    if(value === "0") {
        return false;
    } else {
        return true;
    }
}

function checkEducation() {
    if(validateEducation($("#educ_t").val()) == false) {
        $("#educationError").text("Alegeti o varianta potrivita");
    }else {
        $("#educationError").text("");
    }
}

function checkPhone(phone) {
    if(phoneValidate($("#phone").val()) == false) {
        $("#phoneError").text(`${phone}`);
    }else {
        $("#phoneError").text("");
    }
}

function checkTitle(value) {
    if(value.length != 0) {
        return true;
    } else {
        return false;
    }
}

function changeTitle() {
    if(checkTitle($("#educ").val()) == false) {
        $("#educError").text("Introduceti titlul educatiei");
    } else {
        $("#educError").text("");
    }
}

function checkDate(value) {
    if(value != "") {
        return true;
    } else {
        return false;
    }
}

function changeDate() {
    if(!checkDate($("#date").val())) {
        $("#dateError").text("Introduceti o data");
    }else {
        $("#dateError").text("");
    }
}

$("#firstName").change(function() {
    validateNameSurname($("#firstName").val());
    checker($("#firstNameError"),$("#firstName").val(),name);
})

$("#lastName").change(function() {
    validateNameSurname($("#lastName").val());
    checker($("#lastNameError"),$("#lastName").val(),surname);
})

$("#email").change(function() {
    validateEmail();
    checkMail(email);
})

$("#phone").change(function() {
   phoneValidate($("#phone").val());
   checkPhone(phone);
})

$("#educ_t").change(function() {
    validateEducation($("#educ_t").val());
    checkEducation();
})

$("#educ").change(function() {
    checkTitle($("#educ").val());
    changeTitle();

})

$("#date").click(function() {
    checkDate($("#date").val());
    changeDate();
})

function add(value) {
    return `
        <option>${value}s</option>;
    `;
}

const containerEducation = $("#educ_t");
const containerProfessions = $("#proffesions");
const containerJob = $("#job_n");
const containerCompany = $("#job_cn");

function addSelectOptions() {
    $.ajax({
        url: `http://localhost:3000/education-type/6`,
        method: 'GET',
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response) {
            response.forEach(function(education) {
                containerEducation.append(add(education.education));
              });     
            console.log(response);
        },
    });
}



function addSelectProfessions() {
    $.ajax({
        url: `http://localhost:3000/professions/6`,
        method: 'GET',
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response) {
            response.forEach(function(professions) {
                containerProfessions.append(add(professions.label));
              });     
            console.log(response);
        },
    });
}


function addSelectJobName() {
    $.ajax({
        url: `http://localhost:3000/job-name/6`,
        method: 'GET',
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response) {
            response.forEach(function(job) {
                containerJob.append(add(job.name));
              });     
            console.log(response);
        },
    });
}

function addCompanyName() {
    let location = $("#job_c").val();
    $.ajax({
        url: `http://localhost:3000/companies/6/city/${location}`,
        method: 'GET',
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response) {
            response.forEach(function(company) {
                containerCompany.append(add(company.label));
              });     
            console.log(response);
        },
    });
}


$("#job_c").change(function() {
    addCompanyName();
})


var x=0;

function addInput() {

    var str = '<input type="text" class="link" placeholder="social media link">  <div id="input' + (x + 1) + '"></div>';
    document.getElementById('input' + x).innerHTML = str;
    x++;
} 

const btned = document.getElementById("btn1");

btned.addEventListener("click", () => {
    const form = document.getElementById("edu");

    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});

const btnj = document.getElementById("btn2");

btnj.addEventListener("click", () => {
    const form2 = document.getElementById("job");

    if (form2.style.display === "none") {
        form2.style.display = "block";
    } else {
        form2.style.display = "none";
    }
});

$(document).ready(function() {
    addSelectOptions() ;
    addSelectProfessions();
    addSelectJobName();
})

function buildRow(label, icon) {
    return `
    <div class="alert alert-primary">
        <em class="fa fa-${icon} mr-1"></em> <span class="fw-bold text-${randomColor()}">${label}</span>
    </div>
    `;
}

function loadTitles() {
    $.ajax({
        url: 'http://localhost:3000/form-data',
        method: 'GET',
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response) {
            response.forEach(title => {
                mainRow.append(buildRow(title.label, title.icon));
            });
            console.log(response);
        },
    });
}

function makeRequest() {
    const articles = [];

    
        console.log(($(this)));
        articles.push({
            name : $("#firstName").val(),
            surname : $("#lastName").val(),
            email : $("#email").val(),
            phone : $('#phone').val(),
            physicaladdress : $("#physicaladdress").val(),
            proffesions : $("#proffesions").val(),
            educationType : $("#educ_t").val(),
            educationTitle : $("#educ").val(),
            graduationDate : $("#date").val(),
            jobName : $("#job_n").val(),
            jobStartDate : $("#job1").val(),
            jobEndDate: $("#job2").val(),
            city : $("#job_c").val(),
            companyName : $("#job_cn").val(),
        });
    // if (submitting) {
    //     window.clearTimeout(timer);
    //     navigate();
    //     return;
    // }

    console.log(articles);
    $.ajax({
        url: 'http://localhost:3000/form-data',
        method: 'POST',
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(articles),
        success: function() {
            // $('.container').append(`<h2 class="alert alert-success mt-4">Datele sunt salvate, redirectionez...</h2>`);
            // submitting = true;
            // navigate();
        },
    });
}

$("#submitButton").click(function() {
    makeRequest();
})