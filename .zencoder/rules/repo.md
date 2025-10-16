# ThreadTheory Repository Overview

## Project Summary
ThreadTheory is a handcrafted crochet clothing storefront implemented with static HTML pages, modular CSS, and vanilla JavaScript. The site presents curated collection pages, a creators showcase, and account/cart functionality powered by browser storage and lightweight API stubs. Styling emphasizes gradients, floating elements, and responsive layouts aligned with the brand aesthetic.

## Key Technologies
- **HTML/CSS/JavaScript**: Core stack for UI, animations, and interactivity
- **LocalStorage**: Client-side persistence for user sessions, carts, and votes
- **Node.js scripts**: Utilities under `api/` for database interactions and session handling
- **PowerShell helpers**: Scripts for updating product data and collections

## Notable Directories & Files
- **index.html / home.html**: Landing experience and global navigation
- **creators.html**: Feature-rich creator showcase with filtering and modals
- **collection-*.html**: Individual collection pages sharing grid layouts and add-to-cart behavior
- **styles.css / collection-styles.css**: Global styling, gradients, typography, and product grid rules
- **script.js / collection-script.js**: Handles navigation state, cart logic, modals, and voting timers
- **account.html / account.js / account-login-styles.css**: Registration, login, and dashboard flows
- **api/**: Node-based endpoints (e.g., `server.js`, `mysql-users.js`, `customers.js`) for backend integration
- **reset-voting.html / vote.html / vote-confirmation.html**: Voting workflow and thank-you page assets

## Common Workflows
1. **Develop UI Changes**: Modify relevant HTML/CSS/JS files, keeping gradients and responsive behavior consistent.
2. **Adjust Collections**: Update `collection-*.html` content and ensure cart hooks remain intact.
3. **Update Account/Voting Logic**: Edit `account.js`, `script.js`, or `collection-script.js` while preserving LocalStorage structures.
4. **Backend Simulation**: Use scripts in `api/` when integrating with the MySQL-based user management system.
5. **Data Maintenance**: Run PowerShell scripts (e.g., `update-collections.ps1`) to refresh product data when needed.

## Testing & Verification Tips
- **Browser Testing**: Open HTML files directly or via local server to validate animations, modals, and responsive layouts.
- **Storage Inspection**: Use browser dev tools to inspect `localStorage` entries for carts, user sessions, and timers.
- **Form Validation**: Ensure account creation and login flows provide clear feedback and redirect appropriately.
- **Vote Timer**: Confirm countdown durations, reset behavior, and thank-you page visibility after voting.

Refer to `README.md`, `UPDATES-SUMMARY.md`, and `BLACK-WHITE-UPDATE-SUMMARY.md` for detailed feature descriptions and historical context.