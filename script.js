'use strict';

// Set the target date
const targetDate = new Date('2026-09-05').getTime();

// Update countdown every second
setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display countdown
    document.getElementById('countdown').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2.5em; margin: 10px;">
                <span style="color: #667eea; font-weight: bold;">${days}</span> Days
                <span style="color: #764ba2; font-weight: bold;">${hours}</span> Hours
            </div>
            <div style="font-size: 2.5em; margin: 10px;">
                <span style="color: #667eea; font-weight: bold;">${minutes}</span> Minutes
                <span style="color: #764ba2; font-weight: bold;">${seconds}</span> Seconds
            </div>
        </div>
    `;
    
    // Update days left for statistics
    document.getElementById('daysLeft').textContent = days;

    // If countdown is finished
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 'Baby is here! 👶';
    }
}, 1000);

// Add baby name function
function addName() {
    const nameInput = document.getElementById('babyName');
    const nameList = document.getElementById('nameList');
    
    if (nameInput.value.trim() === '') {
        alert('Please enter a name');
        return;
    }
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${nameInput.value}</span>
        <button onclick="this.parentElement.remove()" style="background: #dc3545; padding: 5px 10px;">Remove</button>
    `;
    nameList.appendChild(li);
    
    // Save to local storage
    saveNames();
    nameInput.value = '';
}

// Save message to local storage
function saveMessage() {
    const message = document.getElementById('personalMessage').value;
    if (message.trim() !== '') {
        localStorage.setItem('babyMessage', message);
        alert('Message saved! ❤️');
    }
}

// Load saved data on page load
window.addEventListener('load', function() {
    // Load saved message
    const savedMessage = localStorage.getItem('babyMessage');
    if (savedMessage) {
        document.getElementById('personalMessage').value = savedMessage;
    }
    
    // Load saved names
    const savedNames = JSON.parse(localStorage.getItem('babyNames')) || [];
    const nameList = document.getElementById('nameList');
    savedNames.forEach(name => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${name}</span>
            <button onclick="this.parentElement.remove(); saveNames();" style="background: #dc3545; padding: 5px 10px;">Remove</button>
        `;
        nameList.appendChild(li);
    });
});

// Save names to local storage
function saveNames() {
    const names = [];
    document.querySelectorAll('#nameList li span').forEach(span => {
        names.push(span.textContent);
    });
    localStorage.setItem('babyNames', JSON.stringify(names));
}