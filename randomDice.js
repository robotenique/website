// Código em Javascript para demonstração da lei fraca dos grandes números
// Por Pedro Pereira & Juliano Garcia, IME-USP

//CanvasJS
function appendRandom(vect, noSides) {
	vect.push(Math.ceil(Math.random() * noSides));
}

function distrib(vect) {
	var size = vect.length;
	var res = [];
	for(var i = 0; i < size; i++) {
		res.push(vect[i] / size);
	}
	return(res)
}

function modalShow(id) {
	document.getElementById(id).style.display = 'block';
}

function modalHide(id) {
	document.getElementById(id).style.display = 'none';
}

function dropdownShow(id) {
	var x = document.getElementById(id);
	if(x.className.indexOf("w3-show") == -1)
		x.className += " w3-show";
	else
		x.className = x.className.replace(" w3-show", "");
}

function setURL(id, url) {
	document.getElementById(id).src = url;
}

function startStop(id) {
	var x = document.getElementById(id);
	if(x.className.indexOf("stopped") == -1) {
		x.className += " stopped";
		stopGraph();
	}
	else {
		x.className = x.className.replace(" stopped", "");
		stopGraph();
		addDataPointsAndRender();
	}
}
