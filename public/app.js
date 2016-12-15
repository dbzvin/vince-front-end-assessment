"use_strict";
(function () {
var url = 'http://localhost:8080/data';
var myArray = [];
function getJSON() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			createArray(this.responseText);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send(null);
}
function createArray(str) {
	var data = JSON.parse(str).data;
	var arr = data.toString().split(', ').sort();
	for (var x = 0; x < arr.length; x++) {
		myArray[x] = {
			number: parseInt(arr[x]),
			toString: function () {
				var n = this.number;
				if (n % 3 === 0) {
					return 'Wrecking';
				} else if (n % 5 === 0) {
					return 'Ball';
				} else {
					return 'number';
				}
			}
		};
	}
	renderUI(myArray);
}
function renderUI(arr) {
	var ul = document.getElementById('wrecking-ball-list');
	ul.addEventListener('click', function (e) {
		if (e.target && e.target.nodeName == 'LI') {
			alert(e.target.innerHTML);
		}
	});
	for (var x = 0; x < arr.length; x++) {
		var li = document.createElement('li');
		li.className = 'wrecking-ball-list-items';
		var liText = document.createTextNode(arr[x].toString());
		li.appendChild(liText);
		ul.appendChild(li);
	}
	renderOptions(arr);
}
function renderOptions(arr) {
	var select = document.getElementById('wrecking-ball-select');
	for (var x = 0; x < arr.length; x++) {
		var option = document.createElement('option');
		option.setAttribute('value', arr[x].number);
		var optionText = document.createTextNode(arr[x].toString());
		option.appendChild(optionText);
		select.appendChild(option);
	}
	select.onchange = function (e) {
		var selectedIndex = e.target.selectedIndex;
		var selectedText = e.target[selectedIndex].text;
		// Event Delegation from the UL element
		var li = document.getElementsByClassName('wrecking-ball-list-items');
		for (var x = 0; x < li.length; x++) {
			var arrText = li[x].textContent;
			var allClassNames = li[x].classList.remove('green');
			var test = {selectedText, arrText, allClassNames};
			// Remove all green to reset
			if (selectedText == arrText) {
				test.selected = true;
				li[x].className += ' green';
			}
		}
	};
}
getJSON();

})();