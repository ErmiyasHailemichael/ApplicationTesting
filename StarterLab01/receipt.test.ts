import {
  addItem,
  deleteItem,
  subtotal,
  total,
  printReceipt,
  ITEMS,
} from "./fixed_receipt";

describe("Receipt & Grocery List Tests", () => {
  beforeEach(() => {
    ITEMS.length = 0; 
    ITEMS.push(
      { name: "paper towels", price: 21.99 },
      { name: "sandwich", price: 8.75 },
      { name: "eggs", price: 6.75 },
      { name: "avocado oil", price: 10.0 }
    );
  });

  describe("addItem", () => {
    // Happy-path
    test("successfully adds a valid item to the grocery list", () => {
      addItem("milk", 3.49);
      expect(ITEMS).toContainEqual({ name: "milk", price: 3.49 });
      expect(ITEMS.length).toBe(5);
    });

    // Unhappy-path
    test("rejects adding an item with a negative price", () => {
      expect(() => addItem("discount item", -5.0)).toThrow();
    });

    // Edge-case
    test("allows adding an item with a price of 0 (free item)", () => {
      addItem("store sample", 0.0);
      expect(ITEMS).toContainEqual({ name: "store sample", price: 0.0 });
    });
  });

  describe("deleteItem", () => {
    // Happy-path
    test("removes the specified item by name", () => {
      deleteItem("sandwich");
      expect(ITEMS.some((item) => item.name === "sandwich")).toBe(false);
      expect(ITEMS.length).toBe(3);
    });

    // Unhappy-path
    test("handles non-existent item gracefully without removing other items", () => {
      deleteItem("non-existent item");
      expect(ITEMS.length).toBe(4);
    });

    // Edge-case
    test("removes correctly when deleting the first item in the list", () => {
      deleteItem("paper towels");
      expect(ITEMS[0].name).toBe("sandwich");
      expect(ITEMS.length).toBe(3);
    });
  });

  describe("subtotal (without tax)", () => {
    // Happy-path
    test("calculates the correct subtotal for list items", () => {
      // 21.99 + 8.75 + 6.75 + 10.00 = 47.49
      expect(subtotal()).toBeCloseTo(47.49, 2);
    });

    // Edge-case
    test("returns 0 when grocery list is empty", () => {
      ITEMS.length = 0;
      expect(subtotal()).toBe(0);
    });
  });

  describe("total (with tax)", () => {
    // Happy-path
    test("calculates the total including a standard tax rate", () => {
      expect(total(0.08)).toBeCloseTo(51.29, 2);
    });

    // Unhappy-path
    test("rejects a negative tax rate", () => {
      expect(() => total(-0.05)).toThrow();
    });

    // Edge-case
    test("calculates total correctly with 0% tax rate", () => {
      expect(total(0.0)).toBeCloseTo(47.49, 2);
    });
  });

  describe("printReceipt", () => {
    // Happy-path
    test("logs formatted receipt to console without throwing errors", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      expect(() => printReceipt(0.08)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});