// Program requirements:
// - A user can withdraw funds.
// - A user can deposit funds.
// - A user's balance should never become negative.
// - A PIN must be provided during every action.

export const USER = "Rose Thecat";
export const USER_PIN = 1234;

// Store balance as a single mutable variable instead of an array.
let balance = 15983;

// Deposits money into a user's account.
export function deposit(pin: number, amount: number) {
  if (pin === USER_PIN) {
    balance += amount;
    console.log(balance);
    return balance;
  } else {
    console.log("Incorrect PIN");
  }
}

// Withdraws money from a user's account.
export function withdrawal(pin: number, amount: number) {
  if (pin === USER_PIN) {
    if (amount > 0 && amount <= balance){
        balance -= amount;
        console.log(balance);
        return balance;
  } else {
    console.log("Insufficient funds.");
  }
} else {
    console.log("Incorrect PIN");
}
}

// Returns the account balance.
export function balanceCheck(pin: number) {
    if (pin === USER_PIN) {
        console.log(`Your balance is ${balance}`);
          return balance;
    } else{
        console.log("Incorrect PIN");
    }
}

// Transfers money to another user's account and withdraws it from the account.
export function transfer(pin: number, amount: number, receiver: string) {
  const transferAmount = withdrawal(pin, amount);
  if (transferAmount !== undefined) {
  console.log(`Success! ${amount} was transferred to ${receiver}`);
  return balanceCheck;
}
}

// AI transparency: AI was used to clean up this code.
