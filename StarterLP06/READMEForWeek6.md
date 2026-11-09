# Learning Practice: Experience-Based Testing

**Feature tested:** Booking (`/bookings/add` form and `/bookings` list) in `airbnb-clone-ts`

## Step 1: Error Guessing

Based on my experience with booking websites, I think these things might go wrong:

1. **Dates:** The form might accept a date in the past or an empty date.
2. **Guests:** The form might accept zero, a negative number, or a huge number of guests.
3. **Bookings list:** A booking might not show up in the list after submitting, or might show wrong details.
4. **Rental selection:** The form might submit without a rental selected, or the dropdown might behave oddly.

## Step 2: Exploratory Testing

**Charter:** Explore the add-booking form by submitting bookings with different rentals, dates, and guest counts, to discover whether each booking appears correctly in the bookings list.

<details>
<summary>Exploratory testing notes</summary>

| What I Tried | What Happened | What I Decided to Try Next |
| ------------ | ------------- | -------------------------- |
| Cozy Cabin, 2026-11-01 (past date), 1 guest | Booking accepted, but the list shows "Rental:" with no rental name | Check whether the past date or the rental causes the blank |
| Beachfront Condo, 2026-11-08, 2 guests | All details displayed correctly | Try Cozy Cabin with today's date |
| Cozy Cabin, 2026-11-08, 6 guests | Booking accepted, but the rental name is missing again | Try the other rentals to see which ones fail |
| Tropical Bungalow, 2026-11-10 (future date), 1 guest | Future booking accepted and displayed correctly | Try 0 guests |
| 0 guests | Error message displayed on the field | Try negative and huge numbers |
| Booked every other rental (Beachfront Condo, Luxury Villa, Mountain Retreat, Downtown Loft, Desert Oasis, Lakeside Cottage, Ski Chalet, Historic Brownstone, Tropical Bungalow), 2026-11-08, 1 guest | All displayed correctly. Only Cozy Cabin was blank. | Check if being the first or default option matters |
| Selected Luxury Villa, then switched back to Cozy Cabin and submitted | Luxury Villa displayed correctly. Cozy Cabin was blank again. | Conclude it is specific to Cozy Cabin |
| Refreshed `/bookings` | All bookings disappeared | Record as a persistence issue |
| -1 guests | Error: "Value must be greater than or equal 1" | Try a huge number |
| 999999 guests (Cozy Cabin and Beachfront Condo) | Accepted with no limit | Record as a missing upper limit |

**Ideas for a future session:**
- There is no checkout date, only a single date field.
- Past dates are accepted.
- The same rental can be booked twice for the same day (duplicates are allowed).

</details>

## Step 3: Checklist-Based Testing

<details>
<summary>Checklist</summary>

| Check | Result | Notes |
| ----- | ------ | ----- |
| The selected rental name appears in the bookings list | **Failed** | Cozy Cabin shows a blank name ("Rental:"). The other 9 rentals I tested display correctly. |
| The date and number of guests in the list match what I entered | **Passed** | Matched in every booking I made. |
| The form rejects 0 guests | **Passed** | Error message shown on the field. |
| The form rejects negative guests | **Passed** | Message: "Value must be greater than or equal 1". |
| The form limits an unrealistically large guest count | **Failed** | 999999 guests was accepted. |
| The form rejects a date in the past | **Failed** | 2026-11-01 was accepted. This assumes past bookings should not be allowed. |
| Bookings are still there after refreshing the page | **Failed** | All bookings disappeared after refresh. |
| Multiple bookings appear in the list together | **Passed** | Several bookings were listed at once. |
| The form rejects an empty date | **Unable to Test** | Not tested yet. |

</details>

## Step 4: Acceptance Testing

<details>
<summary>Acceptance criteria</summary>

| Given, When, Then | Result | Notes |
| ----------------- | ------ | ----- |
| Given I am on the booking form, when I choose Beachfront Condo, today's date, and 2 guests and confirm, then the booking appears in my list with that rental name, date, and number of guests. | **Passed** | All details displayed correctly. |
| Given I am on the booking form, when I choose Cozy Cabin, a date, and a number of guests and confirm, then the booking appears in my list showing "Cozy Cabin" as the rental. | **Failed** | The booking was added, but the rental name was blank ("Rental:"). Happened every time with Cozy Cabin. |
| Given I am on the booking form, when I enter 0 guests, then an error message appears and no booking is added. | **Passed** | An error message was displayed on the field. |
| Given I have made a booking, when I refresh the bookings page, then my booking is still in the list. | **Failed** | All bookings disappeared after refresh. |
| Given I am on the booking form, when I enter a date in the past, then the form tells me the date is not allowed. | **Failed** | A past date (2026-11-01) was accepted with no message. |

</details>

## Summary of Defects Found

1. Cozy Cabin's name does not display in the bookings list.
2. Bookings are lost when the page is refreshed.
3. There is no upper limit on the number of guests (999999 accepted).
4. Past dates are accepted.

## AI Transparency

AI was used to help create portions of this file and to clean up its writing and formatting. All testing was performed by me.