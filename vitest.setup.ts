// vitest.setup.ts
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Clean up the DOM after each test
afterEach(() => {
  cleanup();
});
