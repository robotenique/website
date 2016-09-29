// Código em Javascript para demonstração da lei fraca dos grandes números
// Por Pedro Pereira & Juliano Garcia, IME-USP

//CanvasJS
function appendRandom(vect, noSides) {
	vect.push(Math.ceil(Math.random() * noSides));
}

function estatistics(vect) {
	var size = vect.length;
	var res = [];
	for(var i = 0; i < size; i++) {
		res.push(vect[i] / size);
	}
	return(res)
}

