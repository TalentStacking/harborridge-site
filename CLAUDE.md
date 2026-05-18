# Harbor Ridge Capital — Project Guidelines for Claude

## Commit messages

**Never add `Co-Authored-By` trailers to commit messages.**

Netlify's free tier counts each unique author/co-author in commit history as a
separate contributor. Adding a `Co-Authored-By: Claude ...` trailer causes
Netlify to register a second contributor and reject the build on the free plan.

Write commits under the configured git user only, with no co-author trailer.
