import { SchemaDefinition } from "@hashml/hashml";
import { Schema } from "@hashml/hashml/dist/schema/Schema";
import { convertSchemaToTypescript } from "@hashml/hashml/dist/schema/typescript";
import { readFileSync } from "fs";
import { Command } from "../cli";
import { output } from "../utils";

export interface TypesOptions {
	schema?: string;
	output?: string;
}

export const types: Command<TypesOptions> = {
	command: "types <schema> [output]",
	describe: "Convert a Hashml schema to a Typescript file",
	aliases: [],

	builder: yargs =>
		yargs
			.positional("schema", {
				description: "Path to the Hashml schema (in JSON)",
				type: "string",
				normalize: true,
				demandOption: true
			})
			.positional("output", {
				description: "Typescript file to write to",
				type: "string",
				normalize: true
			}),

	handler: argv => {
		if (!argv.schema!.endsWith(".json")) {
			throw new Error("Schema path must be a .json file");
		}
		if (argv.output && !argv.output.endsWith(".ts")) {
			throw new Error("Output path must be a .ts or .d.ts file");
		}
		const schemaString = readFileSync(argv.schema!, "utf-8");
		const schemaDefinition = JSON.parse(schemaString) as SchemaDefinition;
		const schema = new Schema(schemaDefinition);
		const ts = convertSchemaToTypescript(schema);
		output(ts, argv.output);
	}
};
