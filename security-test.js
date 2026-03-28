// Security Vulnerability Demo - For Code Review Testing

// CRITICAL: SQL Injection Vulnerability
function loadUserData(userId) {
    // Dangerous: User input directly concatenated into query
    var sqlQuery = "SELECT * FROM users WHERE id = " + userId;
    console.log("Executing query: " + sqlQuery);
    return fetch('/api/users/query?sql=' + userId);
}

// CRITICAL: XSS Vulnerability
function renderUserComment(comment) {
    // Dangerous: Direct HTML insertion without escaping
    document.getElementById('comments-section').innerHTML = comment;
}

// CRITICAL: Exposed API Keys
const API_KEY = 'sk-1234567890abcdefghijklmnop';
const DATABASE_URL = 'mongodb://admin:password123@dbserver.local:27017';
const STRIPE_SECRET = 'rk_live_abc123def456ghi789jkl';

// HIGH: O(n²) Performance Issue
function searchItemsList(items, searchTerm) {
    var results = [];
    for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            if (item.name.indexOf(searchTerm) !== -1) {
                results.push(item);
            }
        }
    }
    return results;
}

// HIGH: Code Injection via eval()
function executeCustomScript(code) {
    eval(code);
}

// WARNING: Missing error handling
function fetchAllUsers() {
    fetch('/api/all-users')
        .then(function(response) {
            return response.json();
        })
        .then(function(users) {
            displayUsers(users);
        });
}

// WARNING: Client-side authentication check
function isAdmin() {
    return localStorage.getItem('admin') === 'true';
}

function displayUsers(users) {
    console.log('Displaying users...');
}
