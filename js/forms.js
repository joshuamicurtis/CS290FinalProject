function formhash(form, password) {
    // Create a new element input, this will be our hashed password field. 
	var p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
 
    // Finally submit the form. 
    //form.submit();
	loginRequest(p.value);
}
 
function regformhash(form, uid, email, password, conf) {
     // Check each field has a value
    if (uid.value == ''         || 
          email.value == ''     || 
          password.value == ''  || 
          conf.value == '') {
 
        alert('You must provide all the requested details. Please try again');
        return false;
    }
 
    // Check the username
 
    re = /^\w+$/; 
    if(!re.test(form.username.value)) { 
        alert("Username must contain only letters, numbers and underscores. Please try again"); 
        form.username.focus();
        return false; 
    }
 
    // Check that the password is sufficiently long (min 6 chars)
    // The check is duplicated below, but this is included to give more
    // specific guidance to the user
    if (password.value.length < 6) {
        alert('Passwords must be at least 6 characters long.  Please try again');
        form.password.focus();
        return false;
    }
 
    // At least one number, one lowercase and one uppercase letter 
    // At least six characters 
 
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    if (!re.test(password.value)) {
        alert('Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');
        return false;
    }
 
    // Check password and confirmation are the same
    if (password.value != conf.value) {
        alert('Your password and confirmation do not match. Please try again');
        form.password.focus();
        return false;
    }
 
    // Create a new element input, this will be our hashed password field. 
    var p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    conf.value = "";
 
    // Finally submit the form. 
	makeRequest();
    return true;
}

function makeRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
	  if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
	    var response = xmlhttp.responseText;
	    var elem = document.getElementById('response');
	    elem.innerHTML = response;
	  }
    }
    
	var elem = document.getElementById('SignUp');
	var statement = 'username=' + elem.elements['username'].value;
	statement += '&email=' + elem.elements['email'].value;
	statement += '&p=' + elem.elements['p'].value;
    

    xmlhttp.open("POST",'includes/register.inc.php', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send(statement);
}

function loginRequest(pvalue) {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
	  if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
	    var loginResponse = (xmlhttp.responseText);
		if (xmlhttp.responseText.trim() == 'http://web.engr.oregonstate.edu/~curtisjo/CS290/Final/protected_page.php') {
		  window.location.replace(xmlhttp.responseText);
		}
		else {
	    var elem = document.getElementById('loginResponse');
	    elem.innerHTML = loginResponse;
		}
	  }
    }
    
	var elem = document.getElementById('login_form');
	var statement = 'email=' + elem.elements['email'].value;
	statement += '&p=' + pvalue;
    

    xmlhttp.open("POST",'includes/process_login.php', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send(statement);
}

function addRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
	  if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
	    var loginResponse = (xmlhttp.responseText);
		var elem = document.getElementById('addResponse');
	    elem.innerHTML = loginResponse;
	  }
	}
	var elem = document.getElementById('review_form');
	var statement = 'date=' + elem.elements['date'].value;
	statement += '&price=' + elem.elements['price'].value;
	statement += '&address=' + elem.elements['address'].value;
    statement += '&availability=' + elem.elements['availability'].value;
    xmlhttp.open("POST",'includes/addReview.php', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send(statement);
	reviewDisplay();
	clearform();
}

function clearform()
{
    document.getElementById("date").value=""; 
    document.getElementById("price").value=""; 
    document.getElementById("address").value=""; 
	//document.getElementById("availability").reset(); 
	document.getElementById("review_form").reset(); //don't forget to set the textbox ID
}