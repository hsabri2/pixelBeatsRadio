
function setSlot(time) {
	if(document.getElementById("time").innerHTML === time) {
		alert("Already Chosen")
		return
	}

	document.getElementById("time-input").value = time;
	document.getElementById("time").innerHTML = time;
	alert("time slot chosen!")		  		
}
function validateForm() {
	let x = document.forms["myForm"]["name"].value;
	if (x === "" || document.getElementById("time").innerHTML === "") {
		alert("Name and timeslot must be filled out");
		return false;
	}
}
function copyRecord(song) {

	document.getElementById('records').innerHTML += 
	`<div id="${song}">${song} <button onclick={deleteRecord("${song}")}>delete</button></div>`

	document.getElementById("songs-input").value = document.getElementById("songs-input").value.concat(" ").concat(song)
}

function deleteRecord(song) {
	document.getElementById(song).remove()
}

fetch('http://localhost:3000/data/playlists').then(response => response.json())
  .then(data => {
	document.getElementById('playlists-grid').innerHTML = data.map((user) => 
	    `
		<div class="box" >
				<h2>${user.name}</h2>
				<p>${user.timeslot}</p>
				<input style="height: 1px" type="text" placeholder="Search...">
				<br/>
				${user.songs.map(song => (
					`<li>${song} <button onclick={copyRecord("${song}")}>copy</button></li>`
				)).join('')}
				
		</div>
	    `).join('')
 })
