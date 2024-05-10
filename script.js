function validation() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var signuperror = document.getElementById('signupError'); 

    if (!validateusername(username)) {
        signuperror.textContent = 'Invalid username';
        return false;
    }

    if (!validatepassword(password)) {
        signuperror.textContent = 'Invalid password';
        return false;
    }

   
    signuperror.textContent = '';


    if (username === 'admin' && password === '12345') {
        return true; 
    } else {
        signuperror.textContent = 'Invalid username or password';
        return false; 
    }
}

function validateusername(username) {
    const user = 'admin';
    return username === user;
}

function validatepassword(password) {
    const pass = '12345';
    return password === pass;
}
var p = document.getElementById('data');
var completedTasks = 0; 

function getdata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var output = JSON.parse(this.responseText);
            var dat = "";
            completedTasks = 0; 

            for (let i = 0; i < output.length; i++) {
                dat += `<li>  &nbsp <input type="checkbox" id="todo${i}"> &nbsp <label for="todo${i}"> ${output[i].title}</label></li>`;
            }
            p.innerHTML = dat;

            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        completedTasks++;
                    } else {
                        completedTasks--;
                    }
                    checkCompletion();
                });
            });
        }
    }
    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhttp.send();
}

function checkCompletion() {
    const checkPromise = new Promise((resolve, reject) => {
        if (completedTasks >=5) {
            resolve(completedTasks);
        } else {
            reject('Not enough tasks completed.');
        }
    });

    checkPromise.then(numCompleted => {
        alert(`Congrats. ${numCompleted} Tasks have been Successfully Completed`);
    }).catch(error => {
        console.log(error);
    });
}
function resetCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    completedTasks = 0; 
}

getdata();
