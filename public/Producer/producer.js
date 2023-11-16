// Event listener for form submission
document.getElementById('song-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevents the form from submitting the traditional way
    const songNameInput = document.getElementById('song-name');  // Assume there's an input field with id="song-name"
    if(songNameInput.value === '') {
        alert('Song name is required');
    } else {
        alert('Form submitted with song name: ' + songNameInput.value);
    }
});

// Modifying a DOM Element
const djList = document.querySelector('#left-panel ul');
const playlist = document.querySelector('#right-panel dl');

// Custom DJ Object
let djObject = {
    djs: [],
    addDJ: function(name) {
        this.djs.push({
            name: name,
            playlist: []
        });
    },
    removeDJ: function(name) {
        this.djs = this.djs.filter(dj => dj.name !== name);
    },
    addSongToDJ: function(djName, song, artist) {
        let dj = this.djs.find(dj => dj.name === djName);
        if(dj) {
            dj.playlist.push({ song, artist });
        } else {
            alert('No DJ found with that name');
        }
    }
};

function fetchDJs() {
    fetch('/data/djs', {
    method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
    .then(response => response.json())
    .then(djs => {
        const djList = document.getElementById('dj-list');
        djList.innerHTML = ''; // Clear existing list

        // Populate the list with DJs from the server
        djs.forEach(dj => {
            const li = document.createElement('li');
            li.textContent = dj.name;
            djList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Add a DJ
function addDJ() {
    const djNameInput = document.getElementById('dj-name');
    const name = djNameInput.value;
    if (name) {
        fetch('/add-dj', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(djs => {
            // Clear existing DJ list
            djList.innerHTML = '';

            // Add each DJ to the list
            djs.forEach(dj => {
                const li = document.createElement('li');
                li.textContent = dj.name;
                djList.appendChild(li);
            });

            // Clear the input field
            djNameInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a DJ name');
    }
}

// Remove a DJ
function removeDJ() {
    const djNameInput = document.getElementById('dj-name');
    const name = djNameInput.value;
    if (name) {
        fetch('/delete-dj', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(djs => {
            // Update the DJ list in the DOM with the updated list
            djList.innerHTML = '';
            djs.forEach(dj => {
                const li = document.createElement('li');
                li.textContent = dj.name;
                djList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));

        djNameInput.value = '';  // Clear the input field
    } else {
        alert('Please enter a DJ name to remove');
    }
}

// Add a Song
function addSong(song, artist) {
    const dt = document.createElement('dt');
    dt.textContent = song;
    const dd = document.createElement('dd');
    dd.textContent = artist;
    playlist.appendChild(dt);
    playlist.appendChild(dd);
}

// Window Object
window.onload = function() {
    fetchDJs();
    alert('Welcome to DJ Schedule Page!');
    setTimeout(() => {
        alert('Enjoy the music!');
    }, 2000);  // Alert will pop up 2 seconds after the page loads
};

// Validating Forms
function validateForm() {
    const songNameInput = document.getElementById('song-name');
    if(songNameInput.value === '') {
        alert('Song name is required');
        return false;
    }
    return true;
}

// Variables, Comparison Operators, Logical Operators, Conditionals, Loops, and Functions
function exampleFunction() {
    // Variables
    let count = 0;
    const maxCount = 5;

    // Loops
    while(count < maxCount) {
        // Conditionals
        if(count === 3) {
            console.log('Count is three');
        } else if(count > 3) {
            console.log('Count is greater than three');
        } else {
            console.log('Count is less than three');
        }

        // Comparison Operators and Logical Operators
        if(count > 0 && count < maxCount || count === 0) {
            count++;
        }
    }
}

// Call the function
exampleFunction();
