# GitHub Repository Verification

Use this flow when you only need to confirm a public GitHub repository page is visible and inspectable without changing anything.

## Preferred Steps

1. Open the repository in a new foreground tab with `open_visible_page(url)`.
2. Wait for the page to settle for roughly two seconds after `document.readyState === "complete"`.
3. Use `read_github_repository_heading()` to confirm the heading/title match the expected repo.
4. Capture a screenshot with `capture_named_screenshot(...)`.
5. Avoid starring, following, signing in, or editing unless the user explicitly approves it.

## Notes

- GitHub repo pages are easy to verify with Browser Harness, but use the GitHub API for heavy metadata extraction when you do not need a live browser.
- Keep the tab visible when the user asked for browser verification so they can see the active page.
