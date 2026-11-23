# Lab: Test Planning and Defect Management

**Application under test:** Counter app (`counter-app/`, React + Vite)
**Tester:** Ermi
**Date:** 11-22-2026

## Step 1: Test Plan

### Test objectives
- Verify that the Counter app displays the correct count after each user action.
- Verify the three buttons (Increment, Decrement, Reset) behave as their labels say.
- Find and report any defects, then confirm fixes by retesting.

### Scope
- **In scope:** the displayed count (`Count: N`), the Increment, Decrement and Reset buttons, the initial state, and sequences of button clicks.
- **Out of scope:** styling and layout, accessibility, performance, browser compatibility, and the build and lint tooling.

### Testing approach
- Manual black box testing through the UI, using test cases written from the button labels and the expected counter behavior.
- A review of `src/App.tsx` to guide the test cases (white box review, no code is changed).
- Failed tests are repeated to check that the result can be reproduced.

### Test environment and tools
- macOS (Apple silicon), Vite 8.3.1 dev server (`npm run dev`) at `http://localhost:5173/`.
- Browser: the Chromium-based browser pane in the Claude desktop app.
- Tools: Node and npm (installed with `npm install --force` because of a Linux-only package in `package.json`), Git and GitHub.

### Product risks
- **Risk 1:** a button is wired to the wrong action (for example Decrement increases the count). Impact: high, because the counter gives wrong results.
- **Risk 2:** the app has no stated minimum, so behavior below 0 is unspecified (the plan assumes the count may go negative).

### Entry criteria
- The app builds and `npm run dev` starts without errors.
- The page loads and all three buttons are visible.
- Test cases are written and reviewed.

### Exit criteria
- All test cases have been executed and results recorded.
- All failed tests have been repeated and reported as defects.
- No critical or high severity defects remain open, or they are explicitly accepted.

## Step 2 and Step 3: Test Cases and Execution

| ID | Starting state | Actions | Expected result | Actual result | Pass/Fail |
|----|----------------|---------|-----------------|---------------|-----------|
| TC-01 | Page freshly loaded | None (observe the page) | Heading shows `Count: 0` | `Count: 0` | **Pass** |
| TC-02 | Count is 0 | Click **Increment** | `Count: 1` | `Count: 1` | **Pass** |
| TC-03 | Count is 0 | Click **Decrement** | `Count: -1` | `Count: 1` | **Fail** (reproduced 3 times) |
| TC-04 | Count is non-zero (tested from 1 and from 4) | Click **Reset** | `Count: 0` | `Count: 0` both times | **Pass** |
| TC-05 (multiple actions in sequence) | Count is 0 | 1. Click Increment three times. 2. Click Decrement. 3. Click Reset. | After step 1: `Count: 3`. After step 2: `Count: 2`. After step 3: `Count: 0`. | After step 1: `Count: 3`. After step 2: **`Count: 4`**. After step 3: `Count: 0`. | **Fail** (at step 2) |

**Repeat of failed tests:** TC-03 was run on a fresh page load three separate times (including a second click, which moved the count from 1 to 2), and each Decrement click increased the count. TC-05 failed at the same step. Both failures have the same cause.

## Step 4: Defect Report

| Field | Information |
|-------|-------------|
| Defect ID | DEF-001 |
| Title | Decrement button increases the count instead of decreasing it |
| Related test case | TC-03 (also TC-05, step 2) |
| Test environment | macOS (Apple silicon), Vite 8.3.1 dev server at http://localhost:5173/, Chromium-based browser pane in the Claude desktop app |
| Preconditions | App is running and the page was freshly loaded (count is 0) |
| Steps to reproduce | 1. Run `npm install --force` and `npm run dev` in `counter-app`.<br>2. Open `http://localhost:5173/`.<br>3. Confirm the heading shows `Count: 0`.<br>4. Click **Decrement**. |
| Expected result | The count decreases by 1, so the heading shows `Count: -1`. (From a count of 3, Decrement should give 2.) |
| Actual result | The count increases by 1, so the heading shows `Count: 1`. (From 3, it showed 4.) Repeated clicks keep increasing it. |
| Severity | High: one of the three main controls does the opposite of its label, so the counter cannot be decreased. |
| Priority | High: fix before release. It is a one-line fix, and it blocks normal use of the app. |
| Status | New |
| Supporting evidence | Screenshot of the page after clicking Decrement twice from 0, showing `Count: 2`. |
| Likely cause | In `src/App.tsx`, the Decrement button's handler is `setCount(count + 1)`. It should subtract 1. |

**Confirmation test plan (after the fix):** rerun TC-03 and TC-05 and confirm they pass, then rerun TC-01, TC-02 and TC-04 as a regression check.

## AI Transparency

AI (Claude) was used to run the manual tests in a browser and to help draft and format this document. The test results above were observed in the running application.
