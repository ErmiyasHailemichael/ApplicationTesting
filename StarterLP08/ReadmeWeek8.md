# Learning Practice: Defect Management

## Topics

- Defect identification
- Defect reports
- Severity and priority
- Defect status
- Defect tracking
- Root cause and process improvement

## Learning Objectives

- Identify when an actual result differs from an expected result.
- Distinguish between a product defect, test issue, and requested change.
- Write a clear and reproducible defect report.
- Assign an appropriate severity, priority, and status.
- Track a defect through retesting and closure.
- Identify possible causes and process improvements.

## The Product

The North Vacation Booking application allows users to create and view reservations.

The requirements state:

- A reservation may include 1–12 guests.
- A reservation may last 1–31 nights.
- Check-in must occur before checkout.
- All requested nights must be available.
- A valid reservation includes a one-time $50 cleaning fee.
- Invalid information must produce an error.

During testing, several unexpected results were observed that do not aline with the requirments!!!!. You will investigate and document them using the defect management process.

## Step 1: Classify the Findings

Find the defects in the application that do not match with the above requirments.
For each finding, decide whether it is most likely:

- A product defect
- A problem with the test
- A requested change
- Something that requires more investigation

Explain your decision.

<details>
<summary>Classification table</summary>

| Finding | Classification | Explanation |
| ------- | -------------- | ----------- |
| 1 | Product defect | **Guest limit is not enforced.** The guests field only has `min="1"` and no maximum, so 13, 50 or 500 guests can be submitted. The requirement is 1–12 guests. (`BookingForm.tsx` / `AddBooking.tsx`) |
| 2 | Product defect | **No check-out date or number of nights.** The form only collects a single `date`, so the 1–31 night limit and "check-in must occur before checkout" can't be enforced at all. The requirement is not implemented. |
| 3 | Product defect | **No availability check.** `addBooking` appends every booking to state without looking at existing ones, so the same rental on the same date can be booked repeatedly. The requirement says all requested nights must be available. (`BookingContext.tsx`) |
| 4 | Product defect | **No $50 cleaning fee.** Nothing in the form, context, types or Bookings list calculates, stores or shows a fee or total. |
| 5 | Product defect | **Invalid information produces no error; blank rental is accepted.** Form state starts with `rental: ""`. The dropdown *shows* the first rental, but unless the user changes it, an empty rental is saved. The Bookings page then shows "Rental:" with nothing after it. Nothing validates input or shows an error message, as the requirements demand. |
| 6 | Problem with the test | **"0 guests can be booked."** A test reporting this would be wrong, because `min="1"` makes the browser block submission of 0 or negative guests. The unexpected result comes from the test's assumptions (it expected an app error message, but the browser shows its own validation tooltip), not from a missing guard. The real gap is the missing *maximum* (finding 1). Confirm by trying 0 in the running app. |

*These classifications come from reading the source in `airbnb-clone-ts/src`. Confirm each one in the running app (`npm run dev`) and attach screenshots.*

</details>

## Step 2: Write a Defect Report

Choose **one product defect** from Step 1 and write a complete defect report.

Include:

- Unique identifier
- Title
- Date reported
- Reporter
- Application or feature
- Test environment
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Priority
- Initial status
- Related requirement
- Supporting evidence that should be attached

Your steps should be detailed enough for another person to reproduce the problem.

<details>
<summary>Defect report template</summary>

| Field                            | Information |
| -------------------------------- | ----------- |
| Field | Information |
| -------------------------------- | ----------- |
| Defect ID | DEF-001 |
| Title | Same rental can be booked twice for the same date (no availability check) |
| Date Reported | 11-22-2026 |
| Reporter | Ermi |
| Application or Feature | North Vacation Booking: Add Booking page (`/bookings/add`) and booking list (`/bookings`) |
| Test Environment | Local dev build (`npm run dev`, Vite) with `json-server` serving `db.json` on port 3001; Chrome on macOS |
| Preconditions | App and json-server are running. The rentals list loaded from the Home page (`/`). No bookings exist yet (bookings are stored in memory and reset on page reload). |
| Steps to Reproduce | 1. Open `/` so rentals load, then go to `/bookings/add`.<br>2. Select the rental "Cozy Cabin".<br>3. Enter the date 2026-12-10 and 2 guests.<br>4. Click **Confirm Booking**.<br>5. Without reloading, repeat steps 2–4 with the same rental and date and 3 guests.<br>6. Open `/bookings` (using the in-app link, not a page reload). |
| Expected Result | The second booking is rejected with an error, because the requested night is already booked for that rental. Only one booking exists for Cozy Cabin on 2026-12-10. |
| Actual Result | The second booking is accepted with no error. `/bookings` lists two bookings for Cozy Cabin on 2026-12-10, so the rental is double booked. |
| Severity | High: a core booking rule is broken and the app can create conflicting reservations. |
| Priority | High: fix before the next release. |
| Status | New |
| Related Requirement or Test Case | Requirement: "All requested nights must be available." (Test case: TC-AVAIL-01, duplicate booking of the same rental and date.) |
| Supporting Evidence | Screenshot of the Add Booking form filled in for the second booking; screenshot of `/bookings` showing both entries; steps recorded as a short screen recording. |

</details>

## Step 3: Assign Severity and Priority

Assign a severity and priority to each product defect from Step 1.

Use the following levels:

### Severity

- **Critical:** The application or a major feature cannot be used.
- **High:** A major feature does not work correctly.
- **Medium:** A feature works, but it has a significant problem or workaround.
- **Low:** The problem has a small effect on normal use.

### Priority

- **Urgent:** Fix immediately.
- **High:** Fix before the next release.
- **Medium:** Fix when higher-priority work is complete.
- **Low:** The fix may be postponed.

Explain why you selected each severity and priority. Remember that severity describes the defect’s impact, while priority describes how soon it should be fixed.

<details>
<summary>Severity and priority table</summary>

| Defect | Severity | Priority | Explanation |
| ------ | -------- | -------- | ----------- |
| 1. Guest maximum (12) not enforced | Medium | Medium | The form works, but it accepts values outside the allowed range, which is a significant problem with a workaround (staff can cancel). Impact is moderate and it doesn't block normal use, so it can be fixed after the higher-priority items. Likely cause: only `min="1"` was added, with no max check. |
| 2. No check-out date / nights (1–31), no check-in before checkout rule | High | High | A major feature (choosing a stay length) is missing, and two requirements cannot be tested or enforced. It should be fixed before release. Likely cause: the form was designed around a single date. |
| 3. No availability check (double booking) | High | High | Conflicting reservations can be created, which breaks a core rule and would cause real-world problems for guests and hosts. Fix before the next release. Likely cause: `addBooking` never compares against existing bookings. |
| 4. No $50 cleaning fee | High | Medium | Bookings carry no pricing, so every booking would have the wrong total. The impact is large, but the app has no payment flow yet, so the fix can follow the date and availability work. Likely cause: pricing was never modeled in the types or context. |
| 5. Blank rental accepted / no validation errors | Medium | High | The feature appears to work, but it saves bad data that shows up as blank entries. It is easy to hit, since the user just doesn't touch the dropdown, and the fix is small, so it is worth doing soon. Likely cause: the initial state is `""` while the dropdown displays the first option. |

**Root cause and process improvement:** Every finding traces back to the form and context having no validation layer. Possible improvements: add a shared validation function that is unit tested against the requirement boundaries (1/12 guests, 1/31 nights), review requirements against the form fields before development, and keep a requirement-to-test traceability table so unimplemented rules are noticed earlier.

</details>

## What to Submit

1. Create and initialize a GitHub repository.
2. Commit and push your work to the repository.
3. Make sure the repository is public. Private repositories will not receive credit.
4. Submit the URL on canvas

## AI Transparency

AI was used to help create portions of this file and to clean up its writing and formatting.
