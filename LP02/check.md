# Review Sign-Off & Reflection

## Team Members
- Ermiyas Hailemichael (Author / Reviewer)
- Asma Begum (Scribe / Reviewer)

## Final Review Notes
- **Ermiyas Hailemichael:** Reviewed `issue_log.md` and confirmed that all accepted defects were addressed in `fixBankOfTheNorth.ts`. No additional issues found.
- **Asma Begum:** Cross-referenced `fixBankOfTheNorth.ts` against `issue_log.md` and updated all statuses to `Fixed`. No additional issues found.

---

## Static Analysis Reflection (Manual vs. ESLint)

### What did ESLint identify?
ESLint caught syntax and structural issues, such as unused variables/parameters, unreachable code after the `return` statement in `balanceCheck`, and potential type mismatches.

### What did our group identify that ESLint did not?
Our group caught critical business logic and requirements violations that a linter cannot detect:
- Missing PIN verification on `balanceCheck`.
- The requirement that balances must never drop below zero (overdraft protection).
- Misleading variable names (`balance` vs. `amount`).
- Arithmetic logic errors (adding funds during a withdrawal instead of subtracting).
- Incomplete parameter delegation inside `transfer`.

### Did ESLint identify anything our group missed?
No; our manual review caught all logic, typing, and syntax defects before running the tool. ESLint served as automated validation that syntax and import/export conventions were cleanly resolved.