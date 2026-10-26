# Lab: Black Box Testing

## Step 1: Website

- **Website:** Codecademy
- **URL:** https://www.codecademy.com
- **Features tested:**
  1. Start module practice (review session and the "concepts practiced" counter)
  2. Course and module progress (item states: not started, in progress, completed)

All tests were designed from observed behavior in the browser. I did not look at the website's source code. Tested with a Pro account.

---

## Step 2: Equivalence Partitioning

**Feature:** Start module practice (Lists module, Learn Python 3)
**Input:** Number of review concepts completed in one session (a session has 5 concepts).

| Partition | Type | Representative value | Expected result | Observed |
|---|---|---|---|---|
| None completed (exit immediately) | Valid | 0 | Counter unchanged | Not tested |
| Some completed | Valid | 1 | Counter increases by 1 | 2 / 17 -> 3 / 17 (pass) |
| All completed | Valid | 5 | Counter increases by the number of new concepts | 3 / 17 -> 7 / 17 (+4) |
| Fewer than 0 | Invalid | -1 | Not possible through the UI | N/A |
| More than 5 | Invalid | 6 | Not possible through the UI | N/A |

**Note:** Completing all 5 concepts raised the counter by 4, not 5. A possible cause is that the counter counts unique concepts and one concept repeated from the earlier session. This is unconfirmed.

---

## Step 3: Decision Table Testing

**Feature:** Visibility of the "Start module practice" button
**Conditions:**
- C1: Has the module been started?
- C2: Is the module completed?

**Actions:** Show the button, or hide the button.

| | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| C1: Module started? | N | Y | Y | N |
| C2: Module completed? | N | N | Y | Y |
| **Show button** | | X | ? | - |
| **Hide button** | X | | ? | - |
| Status | Observed | Observed | Not tested | Infeasible |

R4 is infeasible because a module cannot be completed without being started.

### Test cases

| Test | Rule | Setup | Expected | Result |
|---|---|---|---|---|
| TC1 | R1 | Open a module with nothing started | Button hidden | Button missing (pass) |
| TC2 | R2 | Open the Lists module (partly done) | Button shown | Button shown (pass) |
| TC3 | R3 | Open a completed module (Hello World) | Button still shown for review | Not tested: button not confirmed |

**Coverage:** 2 of 3 feasible rules tested, about 67%.

---

## Step 4: State Transition Testing

**Feature:** Progress of an item inside a module (for example, the lesson "Working with Lists in Python").

**States:**
- Not started (plain grey icon)
- In progress (bold, circle icon)
- Completed (yellow check)

The same three states appear at module level (Hello World shows "Completed" with a full progress bar).

**Events:** Open item, finish item, leave without finishing.

### State transition table

| # | Start state | Event | End state | Valid? | Observed |
|---|---|---|---|---|---|
| T1 | Not started | Open item (later in module) | In progress | Valid | Item opened, not blocked (icon change not checked) |
| T2 | In progress | Leave without finishing | In progress | Valid | Still bold (pass) |
| T3 | In progress | Finish item | Completed | Valid | Not tested |
| T4 | Completed | Reopen item | Completed | Valid | Not tested |
| T5 | Not started | Finish without opening | none | Invalid | Cannot happen in the UI |
| T6 | Completed | Revert to not started | none | Invalid | Not tested |

### Test cases

| Test | Precondition | Trigger | Expected end state | Result |
|---|---|---|---|---|
| TC1 | Item not started | Click the item | Opens and becomes current | Opened (pass) |
| TC2 | Item in progress | Go back without finishing | Still current | Pass |
| TC3 | Item in progress | Finish the item | Yellow check, next item becomes current | Not tested (time) |
| TC4 | Item completed | Reopen it | Stays completed | Not tested (time) |

**Coverage:** 2 of 4 valid transitions observed.

---

## AI Transparency

AI assisted with formatting and grammar adjustments. 