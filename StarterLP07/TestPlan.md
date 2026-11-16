# North Vacation Booking Test Plan

## Step 1: Test Context

| Section | Description |
| --- | --- |
| Test objective 1 | Verify that a user can select a rental, enter valid check-in/check-out dates and a valid number of guests, and create a booking that then appears in their booking list. |
| Test objective 2 | Verify that the application rejects invalid input (past dates, a check-out that is not after the check-in, and a guest count of 0 or above the maximum) so that invalid bookings cannot be created. |
| In scope | Selecting a rental, entering check-in and check-out dates, entering the number of guests, creating a booking, viewing bookings, and the increase, decrease and reset controls for values. |
| Out of scope | Payment processing, user account creation and login, email or SMS booking confirmations, and performance or load testing. |
| Test basis | North Vacation Booking product description and requirements |
| Assumption or constraint | Assumptions: the maximum number of guests per rental is defined in the requirements (to be confirmed with the product owner), and check-in today counts as a valid future date. Constraint: Testing must be completed within one week |

## Step 2: Roles and Responsibilities

| Role | Responsibilities | When Involved | Communication |
| --- | --- | --- | --- |
| Tester | Designs and runs tests, reports defects | Requirements review through retesting | Developers, product owner |
| Developer | Delivers builds, fixes defects | Before execution and when defects are reported | Tester |
| Product Owner | Answers requirement questions, accepts release | Requirements review and release decision | Tester, test manager |
| Test Manager | Owns plan, tracks progress, writes reports | Throughout testing | Project team, product owner |

## Step 3: Test Approach

| Test Area | Test Level or Type | Technique | Manual or Automated | Deliverable |
| --- | --- | --- | --- | --- |
| Guest count input | Component testing | Boundary value analysis | Automated | Automated test file |
| Check-in/check-out dates | Component testing | Equivalence partitioning | Automated | Automated test file |
| Create booking flow | System testing (functional) | Use case testing | Manual | Test cases, test results |
| View bookings list | System testing (functional) | Use case testing | Manual | Test cases, test results |
| Increase, decrease, reset controls | Functional testing | Equivalence partitioning | Automated | Automated test file |
| Whole application | Regression testing | Re-run of existing tests | Automated | Test results |
| Overall release | Test completion | N/A | Manual | Defect reports, test completion report |

## Step 4: Test Requirements

| Requirement | Details |
| --- | --- |
| Test environment | A dedicated test environment running the release build, separate from production, with a test database that can be reset between runs |
| Browsers or devices | Latest Chrome, Safari and Firefox on desktop, plus one phone-sized screen |
| Testing tools | Jest for automated tests, a spreadsheet or Markdown file for test cases, GitHub Issues for defect reports |
| Test data | Sample rentals, valid and invalid dates (past, today, future, check-out before check-in), guest counts at the boundaries (0, 1, max, max + 1), and existing bookings for the view list |
| Access and accounts | Test user accounts, access to the test environment, and repo access for testers and developers |
| People and training | Testers briefed on the booking rules and on using Jest and GitHub Issues; product owner available for questions |

## Step 5: Risk Register

| Risk | Type | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| A user can create a booking with a past check-in or check-out date | Product risk | Medium | High | Prioritize date validation tests and run them first |
| A user can create a booking with a check-out date on or before the check-in date | Product risk | Medium | High | Add boundary tests for same-day and reversed dates |
| A guest count of 0 or above the maximum is accepted | Product risk | Medium | High | Use boundary value analysis at 0, 1, max and max + 1 |
| The increase, decrease or reset controls give wrong values | Product risk | Low | Medium | Automate tests for each control and re-run them as regression tests |
| The test environment is unavailable | Project risk | Low | High | Confirm access before testing begins |
| The guest maximum or date rules are unclear in the requirements | Project risk | Medium | Medium | Get answers from the product owner before test design |
| Testing time is cut short | Project risk | Medium | High | Run tests in risk order so the highest-risk tests finish first |

## Step 6: Entry Criteria

| Type | Criterion |
| --- | --- |
| Entry | The release build is deployed and the application opens in the test environment |
| Entry | The test environment and test accounts are available and working |
| Entry | All planned test cases have been written and reviewed |
| Entry | Test data (valid and boundary dates and guest counts) is loaded |
| Entry | Jest and the defect tracker (GitHub Issues) are installed and working |
| Entry | The open requirement questions (guest maximum, whether today is a valid check-in) are answered |

## Step 7: Exit Criteria

| Type | Criterion |
| --- | --- |
| Exit | 100% of planned high-priority tests have been executed |
| Exit | At least 95% of all planned tests have been executed |
| Exit | No critical or high-severity defects remain unresolved |
| Exit | All date and guest-count validation tests (high-risk areas) have passed |
| Exit | The regression suite passes with 0 failures |
| Exit | Requirements coverage is at least 90% |
| Exit | The release deadline has been reached and the product owner has signed off |

## Step 8: Test Schedule

| Activity | Responsible Role | Time | Dependency |
| --- | --- | --- | --- |
| Review requirements and resolve open questions | Tester and product owner | Day 1 | Requirements are available |
| Design test cases and prepare test data | Tester | Day 2 | Requirements have been reviewed |
| Set up the test environment and tools | Developer and tester | Day 2 | Release build is available |
| Review test cases and check entry criteria | Tester and test manager | Day 3 | Test cases are written and the environment is ready |
| Execute tests and report defects | Tester | Days 3-4 | Entry criteria are met |
| Fix defects and retest | Developer and tester | Day 5 | Defects have been reported |
| Run regression tests | Tester | Day 6 | Fixes are delivered |
| Write the test completion report and get sign-off | Test manager and product owner | Day 7 | Exit criteria are met |

## Step 9: Communication Plan

| Information | Audience | Method | Frequency |
| --- | --- | --- | --- |
| Test progress | Project team | Daily stand-up | Daily |
| Defect reports | Developers | GitHub Issues | When a defect is found |
| Requirement questions | Product owner | Chat or email | As needed, before test design |
| Test progress report | Test manager, product owner | Written report | End of each test day |
| Blocked tests or environment problems | Developers, test manager | Chat message | Immediately when found |
| Test completion report | Product owner, project team | Formal report | Once, at the end of testing |