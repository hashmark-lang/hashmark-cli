import { HMError, IRNode, parse, ValidationError } from "@hashml/hashml";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";
import { printValidationError } from "./print-errors";

export function parseFiles(filePath: string | undefined, schemaPath: string | undefined): IRNode {
	if (filePath === undefined) {
		throw new Error("You must define an input file");
	} else if (schemaPath === undefined) {
		throw new Error("You must define a schema file");
	}

	const schemaFile = readFileSync(schemaPath, "utf-8");
	const schema = JSON.parse(schemaFile);
	const file = readFileSync(filePath, "utf-8");

	const errors: HMError[] = [];
	const logger = (error: HMError) => errors.push(error);
	const node = parse(file, schema, logger);

	if (errors.length > 0) {
		for (const err of errors) {
			// TODO temporary type cast
			printValidationError(err as ValidationError, file.split(/\n|\r\n|\r/), filePath);
		}
		const plural = errors.length > 1;
		throw new Error(
			`${errors.length} validation ${plural ? "errors were" : "error was"} found`
		);
	}

	return node;
}

export function output(data: string, path: string | undefined): void {
	if (path) {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, data);
	} else {
		console.log(data);
	}
}
