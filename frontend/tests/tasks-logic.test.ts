import { describe, it, expect } from "vitest";
import {
  getCurrentWeekStartDate,
  formatTaskDueDate,
  taskStatusLabels,
} from "@/lib/tasks";

describe("Backend Task Business Logic (lib/tasks)", () => {
  it("18. getCurrentWeekStartDate vrne datum v formatu YYYY-MM-DD", () => {
    const weekStart = getCurrentWeekStartDate();
    expect(weekStart).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("19. getCurrentWeekStartDate vedno vrne ponedeljek", () => {
    const weekStart = getCurrentWeekStartDate();
    const date = new Date(`${weekStart}T00:00:00Z`);
    // V UTC je ponedeljek getUTCDay() === 1
    expect(date.getUTCDay()).toBe(1);
  });

  it("20. formatTaskDueDate pravilno lokalizira datum v slovenski format", () => {
    const formatted = formatTaskDueDate("2026-11-20");
    expect(typeof formatted).toBe("string");
    expect(formatted.length).toBeGreaterThan(0);
    // V slovenščini vsebuje mesec november ali dan
    expect(formatted.toLowerCase()).toContain("november");
  });

  it("21. taskStatusLabels vsebuje prevode za vse statuse nalog", () => {
    expect(taskStatusLabels.to_do).toBe("To-Do");
    expect(taskStatusLabels.in_progress).toBe("In Progress");
    expect(taskStatusLabels.awaiting_review).toBe("Awaiting Review");
    expect(taskStatusLabels.done).toBe("Done");
    expect(taskStatusLabels.rejected).toBe("Rejected");
  });
});
