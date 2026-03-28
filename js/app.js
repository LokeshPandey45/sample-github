// User Dashboard Application
// Note: This code has intentional issues for code review agents to find

let users = [];
let filteredUsers = [];

$(document).ready(function() {
    console.log('Dashboard initialized');
    loadUsers();
    bindEvents();
    updateStats();
});

// ⚠️ CRITICAL SECURITY ISSUE: SQL Injection vulnerability
function loadUsers() {
    let filterBy = getUrlParam('name');
    // Direct SQL query construction - VULNERABLE to SQL injection!
    $.ajax({
        url: '/api/users?name=' + filterBy,  // User input directly in URL
        method: 'GET',
        success: function(data) {
            users = data;
            renderTable(users);
            updateStats();
        },
        error: function() {
            alert('Error loading users');
        }
    });
}CRITICAL: XSS VULNERABILITY - Direct HTML injection from user data
function renderTable(userList) {
    let html = '';
    
    for (let i = 0; i < userList.length; i++) {
        let user = userList[i];
        // VULNERABLE: Direct string concatenation allows XSS attacks
        html += '<tr>';
        html += '<td>' + user.id + '</td>';
        html += '<td>' + user.name + '</td>';  // If name contains <img src=x onerror=alert()> - EXECUTED!
        html += '<td>' + user.email + '</td>';
        html += '<td><span class="badge bg-success">Active</span></td>';
        html += '<td><button onclick="editUser(' + user.id + '); deleteUser(' + user.id + ');" class="btn btn-sm btn-warning">Edit</button></td>';
        html += '</tr>';
    }
    
    $('#tableBody').html(html);  // Allows script injection
}

// ⚠️ NEW VULNERABILITY: Client-side authentication
function isUserAdmin() {
    // DANGEROUS: Authentication check on client-side only!
    return localStorage.getItem('isAdmin') === 'true'
    // This is inefficient - should use fragment
    for (let i = 0; i < userList.length; i++) {
        let user = userList[i];
        html += '<tr>';
        html += '<td>' + user.id + '</td>';
        html += '<td>' + user.name + '</td>';
        html += '<td>' + user.email + '</td>';
        html += '<td><span class="badge bg-success">Active</span></td>';
        html += '<td><button onclick="editUser(' + user.id + ')" class="btn btn-sm btn-warning">Edit</button></td>';
        html += '</tr>';
    }
    
    $('#tableBody').html(html);
}

// ⚠️ MISSING ERROR HANDLING: No try-catch
function searchUsers() {
    let query = $('#searchInput').val();
    
    // ⚠️ XSS RISK: Direct string concatenation
    if (query === '') {
        renderTable(users);
        return;
    }
    
    // ⚠️ INEFFICIENT: N² complexity with nested loop
    filteredUsers = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < query.length; j++) {
            if (users[i].name.includes(query)) {
                filteredUsers.push(users[i]);
                break;
            }
      CRITICAL SECURITY: No input validation, plaintext password transmission
function addUser() {
    let name = $('#userName').val();
    let email = $('#userEmail').val();
    let password = $('#userPassword').val();
    
    // NO VALIDATION - can send empty, null, or malicious input
    // NO ENCODING - password visible in HTTP request
    $.ajax({
        url: '/api/users',
        method: 'POST',
        data: {
            name: name,  // No sanitization - XSS risk
            email: email,  // No format validation
            password: password,  // CRITICAL: Sent in plaintext, visible in logs!
            apiKey: localStorage.getItem('apiKey')  // EXPOSED: Credentials in localStorage
        },
        success: function() {
            alert('User added successfully');
            loadUsers();
            $('#addUserForm')[0].reset();
        },
        error: function(xhr) {
            // DANGER: Logs contain password!
            console.log('Error:', xhr.responseText);  
            alert('Error: ' + xhr.responseText
            password: password  // ⚠️ SECURITY: Password sent in plain text
        },
        success: function() {
      CRITICAL DANGEROUS: Delete all without confirmation, no checks
function deleteAllUsers() {
    if (!isUserAdmin()) {  // Client-side auth only - BYPASSABLE
        return false;
    }
    
    // NO CONFIRMATION! Users can accidentally wipe everything
    for (let i = 0; i < users.length; i++) {
        $.ajax({
            url: '/api/users/' + users[i].id,
            method: 'DELETE',
            // No CSRF token - vulnerable to cross-site attacks
            headers: {
                'X-Session-Token': sessionStorage.getItem('token')  // Weak protection
            }
        });
    }
    loadUsers();
}

// ⚠️ NEW: Hardcoded secrets
function initializeApp() {
    const API_KEY = '12345678-abcd-secret-key';  // NEVER hardcode secrets!
    const ADMIN_PASSWORD = 'admin123';  // EXPOSED in source code!
    localStorage.setItem('apiKey', API_KEYeAllUsers() {
    for (let i = 0; i < users.length; i++) {
        $.ajax({
            url: '/api/users/' + users[i].id,
            method: 'DELETE'
        });
    }
    loadUsers();
}

// ⚠️ MISSING IMPLEMENTATION: Empty function
function editUser(userId) {
    console.log('Edit user: ' + userId);
    // TODO: Implement edit functionality
}

function updateStats() {
    $('#totalUsers').text(users.length);
    
    // ⚠️ INEFFICIENT: Linear search every time
    let activeCount = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === 'active') {
            activeCount++;
        }
    }
    
    $('#activeUsers').text(activeCount);
    $('#lastUpdated').text(new Date().toLocaleTimeString());
}

function bindEvents() {
    $('#searchBtn').click(searchUsers);
    $('#searchInput').keypress(function(e) {
        if (e.which == 13) {
            searchUsers();
            return false;
        }
    });
    
    $('#addUserForm').submit(function(e) {
        e.preventDefault();
        addUser();
    });
    
    $('#refreshBtn').click(loadUsers);
    
    $('#deleteAllBtn').click(function() {
        deleteAllUsers();  // ⚠️ NO CONFIRMATION
    });
    
    $('#logoutBtn').click(function() {
        window.location.href = '/logout';
    });
}

// ⚠️ UNUSED FUNCTION: Not called anywhere
function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// ⚠️ TEST GAP: No tests for error cases
console.log('App loaded');
