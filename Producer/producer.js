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

// Add a DJ
function addDJ() {
    const djNameInput = document.getElementById('dj-name');
    const name = djNameInput.value;
    if (name) {
        djObject.addDJ(name);
        const li = document.createElement('li');
        li.textContent = name;
        djList.appendChild(li);
        djNameInput.value = '';  // Clear the input field
    } else {
        alert('Please enter a DJ name');
    }
}

// Remove a DJ
function removeDJ() {
    const djNameInput = document.getElementById('dj-name');
    const name = djNameInput.value;
    if (name) {
        djObject.removeDJ(name);
        Array.from(djList.children).forEach(dj => {
            if (dj.textContent === name) {
                djList.removeChild(dj);
            }
        });
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
