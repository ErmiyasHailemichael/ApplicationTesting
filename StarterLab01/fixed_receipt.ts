// Program requirements:
// Items can be added to the grocery list.
// Items can be deleted from the grocery list.
// The subtotal is calculated without tax.
// The total is calculated with tax.
// A receipt can be printed.

export interface Item {
    name: string;
    price: number;
}

export const ITEMS = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

export function addItem(name: string, price: number) {
    if (price < 0) {
        throw new Error("Product price cannot be negative.");
    }
    const newItem = { "name": name, "price": price };
    ITEMS.push(newItem);
}

export function deleteItem(name: string) {
  const idx = ITEMS.findIndex((item) => item.name === name);
  if (idx !== -1) {
    ITEMS.splice(idx, 1);
  }
  return ITEMS;
}

export function subtotal(){
    return ITEMS.reduce((acc, item) => acc + item.price, 0);
}

export function total(taxRate: number) {
    if (taxRate < 0) {
        throw new Error("Tax rate cannot be negative.");
    }
    const currentSubtotal = subtotal();
    const taxAmount = currentSubtotal * taxRate;
    return currentSubtotal + taxAmount; 
}


export function printReceipt(taxRate: number) {
  console.log("************************");

  for (const item of ITEMS) {
    console.log(`${item.name} : $${item.price.toFixed(2)}`);
  }

  console.log("************************");
    const currentSubtotal = subtotal();
    const taxAmount = currentSubtotal * taxRate;
    const totalAmount = currentSubtotal + taxAmount;


    console.log(`Subtotal: $${currentSubtotal.toFixed(2)}`);
    console.log(`Tax: $${taxAmount.toFixed(2)}`);
    console.log(`Total: $${totalAmount.toFixed(2)}`);
}

// AI transparency: AI was used to clean up this code.