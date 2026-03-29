// Vulnerable Code For Testing Dynamic Code Review

// CRITICAL: SQL Injection Vulnerability
function loadUserData(userId) {
    var sqlQuery = "SELECT * FROM users WHERE id = " + userId;
    return fetch('/api/users/query?sql=' + userId);
}

// CRITICAL: XSS Vulnerability
function renderComment(comment) {
    document.getElementById('comments').innerHTML = comment;
}

// CRITICAL: Hardcoded API Keys
const api_key = 'sk-1234567890abcdefghijklmnop';
const password = 'admin123password';

// HIGH: Nested loops O(n²)
function searchUsers(items, term) {
    var results = [];
    for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items.length; j++) {
            if (items[j].name === term) results.push(items[j]);
        }
    }
    return results;
}

// HIGH: eval() code injection
function executeScript(code) {
    eval(code);
}

// Missing error handling
function fetchData() {
    fetch('/api/data')
        .then(r => r.json())
        .then(data => console.log(data));
}
