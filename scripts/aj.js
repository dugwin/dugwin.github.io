var imganimation = '/image/ajanimation.gif'

function GetXmlHttpObject() {
        var xmlHttp=null;

        try {// Firefox, Opera 8.0+, Safari
                xmlHttp=new XMLHttpRequest();
        }

        catch (e) { // Internet Explorer
                try {
                        xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
        }

        return xmlHttp;
}

var place;
var tmp = [];
var no_redraw = [];

function stateChanged() { 
        if (xmlHttp.readyState==2) { 
		if (no_redraw[place])
			document.getElementById(place).innerHTML = tmp[place] + '<img src="'+imganimation+'" />';
		else
			document.getElementById(place).innerHTML = '<img src="'+imganimation+'" />';
        }
        if (xmlHttp.readyState==4) { 
                if (xmlHttp.responseText.length == 0) {
                        document.getElementById(place).innerHTML = '';
                }
                else {
			if (no_redraw[place])
				document.getElementById(place).innerHTML = tmp[place] + xmlHttp.responseText;
			else
                        	document.getElementById(place).innerHTML = xmlHttp.responseText;
		}
		document.body.style.cursor = '';
        }
}

function track(scrpt, pl, str) {

        if (str.length < 3) { 
            return;
        }

        place = pl;

        xmlHttp=GetXmlHttpObject();

        if (xmlHttp==null) {
                alert ("wow! where did you get this browser?");
                return;
        }

        var url=scrpt;
        url=url+"?str="+str;

        xmlHttp.onreadystatechange=stateChanged;
        xmlHttp.open("GET",url,true);

        document.body.style.cursor = 'wait';
        xmlHttp.send(null);
}

function lick2(scrpt, pl, str, noredraw) {

        place = pl;

        xmlHttp=GetXmlHttpObject();

        if (xmlHttp==null) {
                alert ("wow! where did you get this browser?");
                return;
        }

        var url=scrpt;

	tmp[place] = document.getElementById(place).innerHTML;
	no_redraw[place] = noredraw;

	if (str) {
		url=url+'?'+str;
	}

        xmlHttp.onreadystatechange=stateChanged;
        xmlHttp.open("GET",url,true);

	document.body.style.cursor = 'wait';
        xmlHttp.send(null);
}

function lick(scrpt, pl, str) {

        place = pl;

        xmlHttp=GetXmlHttpObject();

        if (xmlHttp==null) {
                alert ("wow! where did you get this browser?");
                return;
        }

        var url=scrpt;

	tmp[place] = document.getElementById(place).innerHTML;

	if (str) {
		url=url+'?'+str;
	}

        xmlHttp.onreadystatechange=stateChanged;
        xmlHttp.open("GET",url,true);

	document.body.style.cursor = 'wait';
        xmlHttp.send(null);
}

function pick(scrpt, pl, form) {

        place = pl;

        xmlHttp=GetXmlHttpObject();

        if (xmlHttp==null) {
                alert ("wow! where did you get this browser?");
                return;
        }

        var url=scrpt;

	var i, l;
	var params = '';

	if (!document.forms[form]) return;

	l = document.forms[form].length;

	if (!l) return;

	while (l--) {
		if (document.forms[form].elements[l].type == 'textarea') {
			if (document.forms[form].elements[l].value) params += document.forms[form].elements[l].name + '=' + encodeURIComponent(document.forms[form].elements[l].value) + '&';
		}
		if (document.forms[form].elements[l].type == 'checkbox') {
            if (!document.forms[form].elements[l].disabled)
                if (document.forms[form].elements[l].checked) params += document.forms[form].elements[l].name + '=1&';
		}
		if (document.forms[form].elements[l].type == 'text' || document.forms[form].elements[l].type == 'hidden') {
			if (document.forms[form].elements[l].value) params += document.forms[form].elements[l].name +'='+ encodeURIComponent(document.forms[form].elements[l].value) + '&';
		}
		if (document.forms[form].elements[l].type == 'select-one') {
			if (document.forms[form].elements[l].value) params += document.forms[form].elements[l].name +'='+ document.forms[form].elements[l].value + '&';
		}
		if (document.forms[form].elements[l].type == 'radio') {
			if (document.forms[form].elements[l].checked)
				params += document.forms[form].elements[l].name +'='+ document.forms[form].elements[l].value + '&';
		}
	}

    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-length", params.length - 1);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Connection", "close");

	document.body.style.cursor = 'wait';

//	alert(params);

        xmlHttp.send(params);
}

function post_save(scrpt, pl, params) {

        place = pl;

	if (params.indexOf('=&') != -1) {
		document.getElementById(place).innerHTML=tmp[place];
		return;
	}

        xmlHttp=GetXmlHttpObject();

        if (xmlHttp==null) {
                alert ("wow! where did you get this browser?");
                return;
        }

        var url=scrpt;

	tmp[place] = document.getElementById(place).innerHTML;

    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-length", params.length);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Connection", "close");

        xmlHttp.send(params);
}
