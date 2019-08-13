import { assert } from "chai";
import { inputPositionComparator } from "../src/print-errors";

describe("print-errors", () => {
	describe("inputPositionComparator()", () => {
		it("returns = 0 when the positions are equal", () => {
			const res = inputPositionComparator(
				{ line: 20, column: 0, length: 1 },
				{ line: 20, column: 0, length: 1 }
			);
			assert.strictEqual(res, 0);
		});

		it("returns < 0 when pos1.line < pos2.line", () => {
			const res = inputPositionComparator(
				{ line: 0, column: 0, length: 1 },
				{ line: 1, column: 0, length: 1 }
			);
			assert.isBelow(res, 0);
		});

		it("returns < 0 on the same line when and pos1.column < pos2.column", () => {
			const res = inputPositionComparator(
				{ line: 2, column: 1, length: 1 },
				{ line: 2, column: 2, length: 1 }
			);
			assert.isBelow(res, 0);
		});

		it("returns < 0 on the same line and col when pos1.length < pos2.length", () => {
			const res = inputPositionComparator(
				{ line: 2, column: 2, length: 1 },
				{ line: 2, column: 2, length: 3 }
			);
			assert.isBelow(res, 0);
		});

		it("returns > 0 when pos1.line > pos2.line", () => {
			const res = inputPositionComparator(
				{ line: 1, column: 0, length: 1 },
				{ line: 0, column: 0, length: 1 }
			);
			assert.isAbove(res, 0);
		});

		it("returns > 0 on the same line when and pos1.column > pos2.column", () => {
			const res = inputPositionComparator(
				{ line: 2, column: 2, length: 1 },
				{ line: 2, column: 1, length: 1 }
			);
			assert.isAbove(res, 0);
		});

		it("returns > 0 on the same line and col when pos1.length > pos2.length", () => {
			const res = inputPositionComparator(
				{ line: 2, column: 2, length: 3 },
				{ line: 2, column: 2, length: 1 }
			);
			assert.isAbove(res, 0);
		});
	});
});
