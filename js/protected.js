window.onload = function () {
  reviewDisplay();
};

function reviewDisplay() {
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
	    var elem = document.getElementById('priorReviews');
	    elem.innerHTML = response;
	  }
    }
	var statement = 'action=init';
	xmlhttp.open("POST",'includes/initReview.php', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send(statement);
}