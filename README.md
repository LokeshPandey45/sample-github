# README - Sample GitHub Project

A sample **HTML + Bootstrap + jQuery** web application with **automated code review** enabled.

## 📁 Project Structure

```
Sample Github/
├── index.html                 # Main dashboard page
├── css/
│   └── style.css             # Custom styling
├── js/
│   └── app.js                # jQuery app logic
├── .github/
│   ├── workflows/
│   │   ├── code-review.yml  # PR review automation
│   │   └── push-review.yml  # Commit review logging
│   ├── copilot-instructions.md  # Code review guidelines
│   └── README.md
├── .githooks/
│   └── pre-commit            # Local pre-commit checks
├── package.json
└── README.md
```

## 🎯 What This Project Demonstrates

This is a **deliberately vulnerable app** to showcase code review agents:

### Security Issues to Find 🔒
- XSS vulnerabilities (DOM manipulation with user input)
- Plaintext password transmission
- Direct API calls without validation
- No error handling for AJAX

### Performance Issues to Find ⚡
- O(n²) nested loops
- Inefficient jQuery selectors
- Missing caching
- DOM thrashing

### Test Coverage Gaps to Find 🧪
- No error case tests
- Missing edge case tests
- No input validation tests
- AJAX error scenarios uncovered

## 🚀 Quick Start

### Step 1: Setup Automation

```bash
cd "C:\Lokesh\Agent_example\Sample Github"
npm run code-review:setup
```

### Step 2: Create Test PR

```bash
# Create a test branch
git checkout -b feature/test-review

# Make a change
echo "// test" >> js/app.js

# Commit and push
git add js/app.js
git commit -m "test: add javascript code"
git push origin feature/test-review

# Open PR on GitHub → Watch auto-comments appear
```

### Step 3: Use Code Review Agents

In Copilot chat:
```
/code-review

# Or paste this and ask:
"Review this code for security vulnerabilities"

function searchUsers() {
    let query = $('#searchInput').val();
    if (query === '') {
        renderTable(users);
        return;
    }
    
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
```

**Expected findings:**
- 🔒 XSS risk from direct string concatenation
- ⚡ O(n²) performance issue
- 🧪 No test cases for edge scenarios

## 🔄 Workflow Triggers

### Local (Pre-commit)
```bash
git commit -m "changes"
# ✓ Pre-commit hook runs automatically
# ✓ Checks console.log, alert(), var usage
# ✓ Blocks commit if critical issues found
```

### Pull Request
```
PR opened on GitHub
  ↓
3 parallel reviews run (2-3 min)
  ├─ 🔒 Security Review comment
  ├─ ⚡ Performance Review comment
  └─ 🧪 Testing Review comment
```

### Push to Main
```
git push origin main
  ↓
Workflow logs commit changes in GitHub Actions tab
```

## 📋 Code Review Checklist

Before merging, ensure:

### Security ✅
- [ ] No `alert()` or `console.log()` in production code
- [ ] All user inputs validated
- [ ] No plaintext sensitive data
- [ ] HTTPS/TLS properly configured

### Performance ✅
- [ ] No nested loops without justification
- [ ] jQuery selectors cached
- [ ] DOM updates batched
- [ ] Page load time acceptable

### Testing ✅
- [ ] Happy path tested
- [ ] Error cases handled
- [ ] Edge cases covered
- [ ] Form validation tested

## 🛠️ Customization

### Add Your Own Code Issues

Edit `js/app.js` and add vulnerabilities you want reviewed:
```javascript
// Add SQL injection example
let query = "SELECT * FROM users WHERE name = '" + userName + "'";

// Add inefficient loop
for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
        // O(n²) operation
    }
}
```

### Modify Review Criteria

Edit `.github/copilot-instructions.md` to change what's reviewed.

### Change Automation Triggers

Edit `.github/workflows/code-review.yml` to trigger on different events.

## 📚 Related Documentation

- **Agent Demo**: See `C:\Lokesh\agent_demo` for the agents repo
- **Setup Guide**: See `.github/workflows/` for automation configs
- **GitHub Copilot Docs**: https://docs.github.com/en/copilot

## 🎓 Learning Objectives

This project teaches:
1. ✅ How automated code reviews work
2. ✅ Common web app vulnerabilities
3. ✅ Performance optimization patterns
4. ✅ Testing strategies
5. ✅ CI/CD integration with GitHub Actions

## 📞 Usage Examples

### Example 1: Find Security Issues

**In Copilot Chat:**
```
/code-review

Paste from js/app.js, select "security" focus
```

**Expected findings:**
```
🔒 CRITICAL: XSS in renderTable function
- Direct HTML concatenation with user data
- Fix: Use .text() instead of .html()

🔒 CRITICAL: Plaintext password transmission
- Passwords sent in plain text
- Fix: Use HTTPS + salted hashing
```

### Example 2: Optimize Performance

```
/code-review

Paste searchUsers() function, select "performance" focus
```

**Expected findings:**
```
⚡ MEDIUM: O(n²) algorithm
- Nested loops: n * query.length
- Current: 1000 users * avg 5 char search = 5000 loops
- Fix: Use simple .filter() instead

⚡ LOW: Missing selector caching
- $('#searchInput') called every search
- Fix: Cache at module start
```

### Example 3: Design Tests

```
/code-review

Paste addUser() function, select "testing" focus
```

**Expected findings:**
```
🧪 Missing: Form validation test
🧪 Missing: Email format validation
🧪 Missing: Error handling for failed AJAX
🧪 Missing: Password strength validation
```

## ✅ Verification

- [ ] `.github/workflows/` files exist
- [ ] `.githooks/pre-commit` is executable
- [ ] `package.json` has scripts
- [ ] Copilot instructions configured
- [ ] Test PR auto-reviewed successfully
- [ ] Team can run `npm run code-review:setup`

## 🚀 Next Steps

1. **Try a PR**: Create test-review branch, make changes, open PR
2. **Read findings**: Review auto-comments on PR
3. **Use agents**: Try `/code-review` in Copilot for each issue type
4. **Fix code**: Apply suggestions and see workflow pass
5. **Share with team**: Merge and notify team to try it

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Ready for team use
