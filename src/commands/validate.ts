import chalk from "chalk";
import { Command } from "../cli";
import { parseFiles } from "../utils";

export interface ValidateOptions {
	schema?: string;
	file?: string;
}

export const validate: Command<ValidateOptions> = {
	command: "validate <file> <schema>",
	describe: "Validate a Hashml file with a Hashml schema",
	aliases: [],

	builder: yargs =>
		yargs
			.positional("file", {
				description: "Path to the Hashml file to validate",
				type: "string",
				normalize: true,
				demandOption: true
			})
			.positional("schema", {
				description: "Path to the Hashml schema file",
				type: "string",
				normalize: true,
				demandOption: true
			}),

	handler: argv => {
		parseFiles(argv.file, argv.schema);
		console.log(chalk.green("No validation errors"));
	}
};
