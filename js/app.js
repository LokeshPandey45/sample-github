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

// ⚠️ SECURITY ISSUE: Direct SQL construction (if this was a real backend)
function loadUsers() {
    $.ajax({
        url: '/api/users',
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
}

// ⚠️ PERFORMANCE ISSUE: O(n) loop with DOM manipulation in each iteration
function renderTable(userList) {
    let html = '';
    
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
        }
    }
    
    renderTable(filteredUsers);
}

// ⚠️ NO INPUT VALIDATION
function addUser() {
    let name = $('#userName').val();
    let email = $('#userEmail').val();
    let password = $('#userPassword').val();
    
    // Direct API call without validation
    $.ajax({
        url: '/api/users',
        method: 'POST',
        data: {
            name: name,
            email: email,
            password: password  // ⚠️ SECURITY: Password sent in plain text
        },
        success: function() {
            alert('User added successfully');
            loadUsers();
            $('#addUserForm')[0].reset();
        }
    });
}

// ⚠️ DANGEROUS: Delete all without confirmation dialog
function deleteAllUsers() {
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
