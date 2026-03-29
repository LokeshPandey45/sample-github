// Clean, Secure Code Example

// ✅ Safe: Parameterized query
function getUserData(userId) {
    const params = new URLSearchParams();
    params.append('id', userId);
    return fetch(`/api/users?${params}`);
}

// ✅ Safe: Text content (no HTML injection)
function displayComment(comment) {
    const element = document.getElementById('comments');
    element.textContent = comment;  // Safe - no HTML parsing
}

// ✅ Safe: No hardcoded secrets
const API_KEY = process.env.API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// ✅ Efficient: O(n) algorithm with caching
const userCache = new Map();
function searchUsers(items, term) {
    const cacheKey = term.toLowerCase();
    if (userCache.has(cacheKey)) {
        return userCache.get(cacheKey);
    }
    
    const results = items.filter(item => 
        item.name.toLowerCase().includes(cacheKey)
    );
    
    userCache.set(cacheKey, results);
    return results;
}

// ✅ Safe: Never uses eval()
function executeCommand(commandName, args) {
    const commands = {
        'get': () => fetch('/api/data'),
        'post': () => fetch('/api/save', { method: 'POST', body: JSON.stringify(args) })
    };
    return commands[commandName]?.() || Promise.reject('Unknown command');
}

// ✅ Good: Proper error handling
function fetchUserList() {
    return fetch('/api/users')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Invalid data format');
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch users:', error);
            return [];
        });
}

// ✅ Good: Input validation
function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValid;
}

// ✅ Good: No dangerous operations
function deleteUsers(ids) {
    if (!Array.isArray(ids) || ids.length === 0) {
        console.warn('Invalid input: no IDs provided');
        return;
    }
    // Batch safe deletion with confirmation
    return confirm('Delete selected users?') ? 
        fetch('/api/users/delete', { method: 'POST', body: JSON.stringify({ ids }) }) :
        Promise.reject('Cancelled');
}
