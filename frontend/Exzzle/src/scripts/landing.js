// Create floating creatures
function createCreatures() {
    const background = document.getElementById('background-animation');
    const numCreatures = 15;
    const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#E91E63'];

    for (let i = 0; i < numCreatures; i++) {
        const creature = document.createElement('div');
        creature.className = 'creature';
        
        // Randomize creature properties
        const size = Math.random() * 20 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * -20;
        const duration = Math.random() * 10 + 15;

        creature.style.width = `${size}px`;
        creature.style.height = `${size}px`;
        creature.style.backgroundColor = color;
        creature.style.left = `${Math.random() * 100}vw`;
        creature.style.top = `${Math.random() * 100}vh`;
        creature.style.animationDelay = `${delay}s`;
        creature.style.animationDuration = `${duration}s`;

        background.appendChild(creature);
    }
}

// Toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');

    loginToggle.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    });

    signupToggle.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginToggle.classList.remove('active');
        signupToggle.classList.add('active');
    });
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/players/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('playerId', data.id);
            localStorage.setItem('username', data.username);
            showRiddle();
        } else {
            showError('login-form', 'Invalid username or password');
        }
    } catch (error) {
        showError('login-form', 'Error connecting to server');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        showError('signup-form', 'Passwords do not match');
        return;
    }

    try {
        const response = await fetch('/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('playerId', data.id);
            localStorage.setItem('username', data.username);
            showRiddle();
        } else {
            const error = await response.json();
            showError('signup-form', error.message || 'Error creating account');
        }
    } catch (error) {
        showError('signup-form', 'Error connecting to server');
    }
}

// Show error message
function showError(formId, message) {
    const form = document.getElementById(formId);
    let errorDiv = form.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

// Show riddle after successful authentication
function showRiddle() {
    document.querySelector('.auth-container').classList.add('hidden');
    const riddleContainer = document.getElementById('initial-riddle');
    riddleContainer.classList.remove('hidden');
    setTimeout(() => riddleContainer.classList.add('visible'), 100);
}

// Handle riddle submission
async function handleRiddleSubmit(event) {
    event.preventDefault();
    const answer = document.getElementById('riddle-answer').value.toLowerCase();
    
    if (answer === 'light') {
        // Update player progress in database
        try {
            await fetch(`/api/players/${localStorage.getItem('playerId')}/start-game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            window.location.href = '/game';
        } catch (error) {
            showError('initial-riddle', 'Error starting game');
        }
    } else {
        showError('initial-riddle', 'That\'s not quite right. Try again!');
    }
}

// Initialize landing page
function init() {
    createCreatures();
    toggleForms();
    
    // Add event listeners
    document.getElementById('login-button').addEventListener('click', handleLogin);
    document.getElementById('signup-button').addEventListener('click', handleSignup);
    document.getElementById('submit-riddle').addEventListener('click', handleRiddleSubmit);
    
    // Check if user is already logged in
    const playerId = localStorage.getItem('playerId');
    if (playerId) {
        showRiddle();
    }
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 