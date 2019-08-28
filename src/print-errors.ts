import { InputPosition, ValidationError } from "@hashml/hashml";
import chalk from "chalk";

/**
 * Returns:
 *
 * - < 0 if pos1 <  pos2
 * - = 0 if pos1 == pos2
 * - > 0 if pos1 >  pos2
 *
 * @param pos1 First position
 * @param pos2 Second position
 */
export function inputPositionComparator(pos1: InputPosition, pos2: InputPosition): number {
	return pos1.line - pos2.line || pos1.column - pos2.column || pos1.length - pos2.length;
}

const contextSize = 2;
const tabSize = 4;

export function printValidationError(error: ValidationError, lines: string[], filePath: string) {
	const positions = error.positions.sort(inputPositionComparator);
	const lineNumbers = positions.map(pos => pos.line);
	const errorLines = new Set(lineNumbers);
	const groups = lineGroups(lineNumbers);
	const groupSeparator = "\u22EE";
	const lastLine = groups[groups.length - 1].last + contextSize;
	const gutterSize = Math.max(groupSeparator.length, lastLine.toString().length);

	printErrorHeader(error, filePath);

	for (let i = 0; i < groups.length; ++i) {
		const group = groups[i];
		const contextStartLineNum = Math.max(1, group.first - contextSize);
		const contextEndLineNum = Math.min(lines.length, group.last + contextSize);

		for (let line = contextStartLineNum; line <= contextEndLineNum; ++line) {
			const j = line - 1;
			const isErrorLine = errorLines.has(line);
			const indentation = Math.max(0, lines[j].search(/[^\t]/));
			const code = lines[j].replace(/\t/g, " ".repeat(tabSize));

			// Print line:
			console.log(lineIndicator(isErrorLine), gutter(gutterSize, line), code);

			// Print column indicator:
			if (isErrorLine) {
				const position = positions.find(pos => pos.line === line)!; // TODO temporary
				const start = position.column + indentation * (tabSize - 1);
				const end = position.column + position.length + indentation * (tabSize - 1);
				console.log(
					lineIndicator(false),
					gutter(gutterSize, null),
					colIndicator(start, end)
				);
			}
		}

		if (i !== groups.length - 1) {
			console.log(lineIndicator(false), gutter(gutterSize, groupSeparator));
		}
	}
	console.log();
}

// The error header is the name of the error + a link to the file + error message:
function printErrorHeader(error: ValidationError, filePath: string) {
	const locationLink = filePath + ":" + error.positions[0].line + ":" + error.positions[0].column;
	console.log(
		chalk.bold(chalk.redBright(`Error HM${error.code}`)),
		chalk.blueBright(locationLink),
		chalk.bold(error.message)
	);
}

// If the line contains an error, we write a ">" indicator in front of it:
function lineIndicator(indicate: boolean): string {
	return indicate ? chalk.bold(chalk.redBright(">")) : " ";
}

// The gutter contains a line number (optionally) and a "│" (unicode 9474, 0x2502) separator:
function gutter(size: number, lineNumber: number | string | null): string {
	return chalk.gray(
		String(lineNumber === null ? "" : String(lineNumber)).padStart(size) + " \u2502"
	);
}

// The error position is indicated by "^^^^" under it:
function colIndicator(start: number, end: number): string {
	return " ".repeat(start - 1) + chalk.bold(chalk.redBright("^".repeat(end - start)));
}

function lineGroups(lineNumbers: number[]): Array<{ first: number; last: number }> {
	const first = lineNumbers[0];
	let currentGroup = { first, last: first };
	const groups = [currentGroup];
	for (const lineNumber of lineNumbers) {
		if (currentGroup.last + contextSize >= lineNumber) {
			currentGroup.last = lineNumber;
		} else {
			// new group:
			currentGroup = { first: lineNumber, last: lineNumber };
			groups.push(currentGroup);
		}
	}
	return groups;
}
