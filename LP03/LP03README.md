## Team members:
 - Ermiyas Hailemichael
 - Asma Begum

# LP03: Black-Box Testing, Part 1 - North Vacation Booking
- Equivalence partitions and test cases for the North Vacation Booking reservation requirements.
- Tests are designed from the requirements only, with no application code.
-----

## Step 1: Identify the Equivalence Partitions

|   | Classification            | Why it needs testing |
| - | --------------            | -------------------- |
| 1 | Number of nights          | Must be 1–31 inclusive; calculated as `checkout - check-in` |
| 2 | Number of guests          | Must be 1–12 inclusive; guests over five add a fee |
| 3 | Check-in & checkout dates | Check-in must be before checkout; dates must be valid |
| 4 | Availability              | Every reserved night must be available; the checkout date is not a reserved night |
 

Cost formula (used for expected results): `total = nights × $200 + $50 + max(0, guests − 5) × $25 × nights`

## Step 2: Create Equivalence Partition Tables

### Number of nights
 
| Classification   | Partition    | Range or Condition | Expected Result      |
| --------------   | ---------    | ------------------ | ---------------      |
| Number of nights | Invalid low  | 0 or fewer nights  | `ValueError`         |
| Number of nights | Valid        | 1–31 nights        | Reservation accepted |
| Number of nights | Invalid high | 32 or more nights  | `ValueError`         |

### Number of guests
 
| Classification   | Partition | Range or Condition | Expected Result |
| --------------   | --------- | ------------------ | --------------- |
| Number of guests | Invalid low | Fewer than 1 guest | `ValueError` |
| Number of guests | Valid, standard rate | 1–5 guests | No additional guest fee |
| Number of guests | Valid, additional fee | 6–12 guests | Additional $25 per guest over five, per night |
| Number of guests | Invalid high | More than 12 guests | `ValueError` |

### Check-in and checkout dates
 
| Classification | Partition | Range or Condition | Expected Result |
| -------------- | --------- | ------------------ | --------------- |
| Dates | Valid | Check-in is before checkout | Reservation accepted |
| Dates | Invalid, same day | Check-in equals checkout | `ValueError` |
| Dates | Invalid, reversed | Check-in is after checkout | `ValueError` |
| Dates | Invalid, missing or not a date | Missing, empty, or non-date value | `ValueError` |

### Availability


| Classification | Partition | Range or Condition | Expected Result |
| -------------- | --------- | ------------------ | --------------- |
| Availability | Available, no overlap | No requested night is booked | Reservation accepted |
| Availability | Available, adjacent | Requested checkout equals existing check-in, or requested check-in equals existing checkout (the checkout date is not a reserved night) | Reservation accepted |
| Availability | Unavailable, partial overlap | Some requested nights are booked, some are free | `UnavailableError` |
| Availability | Unavailable, inside booking | All requested nights are within the booked range | `UnavailableError` |
| Availability | Unavailable, surrounds booking | Requested range starts before and ends after the booked range | `UnavailableError` |
 
## Step 3: Test Cases
 
Unless stated otherwise, each test uses 2 guests and no conflicting reservations.
 
### Number of nights
 
| ID | Classification | Partition | Input | Expected Result |
| -- | -------------- | --------- | ----- | --------------- |
| TC01 | Number of nights | Invalid low | Check-in 2026-12-03, checkout 2026-12-01 (−2 nights) | `ValueError` |
| TC02 | Number of nights | Valid | Check-in 2026-12-01, checkout 2026-12-08 (7 nights) | Accepted; total $1,450 (7 × $200 + $50) |
| TC03 | Number of nights | Invalid high | Check-in 2026-12-01, checkout 2027-01-02 (32 nights) | `ValueError` |
 
### Number of guests
 
Dates for these tests: check-in 2026-12-01, checkout 2026-12-04 (3 nights).
 
| ID | Classification | Partition | Input | Expected Result |
| -- | -------------- | --------- | ----- | --------------- |
| TC04 | Number of guests | Invalid low | 0 guests | `ValueError` |
| TC05 | Number of guests | Valid, standard rate | 3 guests | Accepted; no guest fee; total $650 (3 × $200 + $50) |
| TC06 | Number of guests | Valid, additional fee | 8 guests | Accepted; 3 extra guests × $25 × 3 nights = $225 fee; total $875 |
| TC07 | Number of guests | Invalid high | 13 guests | `ValueError` |
 
### Check-in and checkout dates
 
| ID | Classification | Partition | Input | Expected Result |
| -- | -------------- | --------- | ----- | --------------- |
| TC08 | Dates | Valid | Check-in 2026-12-01, checkout 2026-12-04 | Accepted; 3 nights; total $650 |
| TC09 | Dates | Invalid, same day | Check-in 2026-12-05, checkout 2026-12-05 | `ValueError` |
| TC10 | Dates | Invalid, reversed | Check-in 2026-12-10, checkout 2026-12-05 (−5 nights) | `ValueError` |
| TC11 | Dates | Invalid, missing or not a date | Check-in `"not a date"`, checkout 2026-12-05 | `ValueError` |
 
### Availability
 
Existing reservation: check-in 2026-12-10, checkout 2026-12-15.
 
| ID | Classification | Partition | Input | Expected Result |
| -- | -------------- | --------- | ----- | --------------- |
| TC12 | Availability | Available, no overlap | 2026-12-20 to 2026-12-23 | Accepted; total $650 |
| TC13 | Availability | Available, adjacent | 2026-12-07 to 2026-12-10 (checkout on existing check-in day) | Accepted; total $650 |
| TC14 | Availability | Available, adjacent | 2026-12-15 to 2026-12-18 (check-in on existing checkout day) | Accepted; total $650 |
| TC15 | Availability | Unavailable, partial overlap | 2026-12-08 to 2026-12-12 | `UnavailableError` |
| TC16 | Availability | Unavailable, inside booking | 2026-12-11 to 2026-12-13 | `UnavailableError` |
| TC17 | Availability | Unavailable, surrounds booking | 2026-12-08 to 2026-12-17 | `UnavailableError` |
 
### Coverage
 
| Classification | Partitions identified | Partitions tested | Coverage |
| -------------- | --------------------- | ----------------- | -------- |
| Number of nights | 3 | 3 | 100% |
| Number of guests | 4 | 4 | 100% |
| Dates | 4 | 4 | 100% |
| Availability | 5 | 5 | 100% |
 
## How Equivalence Partitioning Reduces the Number of Tests
 
Nights alone accept any of 31 valid values, and guests any of 12. Testing every combination would be hundreds of cases. Because values in the same partition should behave the same way, one representative per partition covers the behavior with 17 test cases.
 
## AI Transparency

AI was used to help with grammar, table creation, and formatting.
 
## Citation
 
GeeksforGeeks. (2026, July 3). _Equivalence partitioning method_. https://www.geeksforgeeks.org/software-engineering/equivalence-partitioning-method/