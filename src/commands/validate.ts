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
		try {
			const [errors] = parseFiles(argv.file, argv.schema);
			if (errors.length > 0) {
				process.exit(1);
			} else {
				console.log(chalk.green("No validation errors"));
			}
		} catch (e) {
			console.error(chalk.redBright("Error: " + e.message), "\n");
			console.error(e.stack);
			process.exit(1);
		}
	}
};
