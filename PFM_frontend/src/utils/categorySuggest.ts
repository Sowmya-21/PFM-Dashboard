// very small starter list; you can expand later
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Food & Drink": ["coffee", "cafe", "starbucks", "restaurant", "dinner", "lunch", "breakfast"],
  "Groceries": ["grocery", "supermarket", "kroger", "walmart", "grocer"],
  "Shopping": ["amazon", "mall", "store", "purchase", "shopping"],
  "Utilities": ["electricity", "water", "gas", "utility", "bill"],
  "Transport": ["uber", "lyft", "taxi", "train", "bus"],
  // add more as you see fit
};

export function suggestBudgetCategory(description: string) {
  const text = description.toLowerCase();
  for (const [category, keys] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keys.some((k) => text.includes(k))) return category;
  }
  return null;
}
