# Option 1: Using a Simple Browser File Open

Clone the Repository (or create the files):
git clone [your-repo-url] user-profile-card
cd user-profile-card
Open the file: Locate the index.html file in your file explorer.

Double-click index.html. It will open directly in your default web browser.

Option 2: Using a Local Web Server

Using a local server ensures the correct handling of file paths and is best practice for front-end development.

Install Live Server (VS Code users): If you are using VS Code, install the "Live Server" extension.
Launch Server: Right-click on index.html and select "Open with Live Server".

The project will open in your browser, typically at <http://127.0.0.1:5500/index.html>.

## Testing Notes and Acceptance Criteria Check

The component was built specifically to pass a set of checks based on the required data-testid attributes and behavior.

| Requirement | Data-testid / Element | Test Notes |
| :--- | :--- | :--- |
| **Root Container** | `data-testid="test-profile-card"` (on `<article>`) | Check for semantic `<article>` tag. |
| **Name** | `data-testid="test-user-name"` (on `<h2>`) | Check for plain text content and semantic `<header>`/`<h2>`. |
| **Bio** | `data-testid="test-user-bio"` (on `<p>`) | Check for paragraph text content. |
| **Current Time** | `data-testid="test-user-time"` | Value must be a number close to `Date.now()` (milliseconds). |
| **Avatar Image** | `data-testid="test-user-avatar"` (on `<img>`) | Check for `<img>` inside a `<figure>` with an `alt` attribute. |
| **Social Links List** | `data-testid="test-user-social-links"` (on `<nav>`) | Check for child `<a>` elements with `target="_blank"` and `rel="noopener noreferrer"`. |
| **Social Link (Example)** | `data-testid="test-user-social-twitter"` | Check for keyboard focusability and visible focus styling. |
| **Hobbies List** | `data-testid="test-user-hobbies"` (on `<ul>`) | Check for semantic `<section>` and `<ul>` structure. |
| **Dislikes List** | `data-testid="test-user-dislikes"` (on `<ul>`) | Check for semantic `<section>` and `<ul>` structure. |
| **Responsiveness** | Media Queries/Flexbox | Resize browser window to verify vertical stacking on mobile and side-by-side layout on desktop. |
