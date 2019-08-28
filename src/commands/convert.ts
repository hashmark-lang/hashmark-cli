import { IRNode, toXML } from "@hashml/hashml";
import chalk from "chalk";
import { mkdirSync, writeFileSync } from "fs";
import * as path from "path";
import { CommandModule } from "..";
import { parseFiles } from "../utils";

export interface ConvertOptions {
	file?: string;
	schema?: string;
	format: string;
	output?: string;
}

const formats = ["json", "xml"];

export const convert: CommandModule<ConvertOptions> = {
	command: "convert [options] <file> <schema>",
	describe: "Convert Hashml files",
	aliases: [],

	builder: yargs =>
		yargs
			.option("f", {
				decription: "Output format of the AST",
				type: "string",
				choices: ["auto", ...formats],
				default: "auto",
				defaultDescription: `"auto": infers the format from the output file. Defaults to "json"`,
				coerce: (v: string) => v.toLowerCase()
			})
			.alias("f", "format")
			.option("o", {
				alias: "output",
				description: "Write output to a file",
				type: "string",
				normalize: true
			})
			.positional("file", {
				type: "string",
				description: "Path to the Hashml file",
				demandOption: true,
				normalize: true
			})
			.positional("schema", {
				type: "string",
				description: "Path to the schema file (JSON)",
				demandOption: true,
				normalize: true
			}),

	handler: argv => {
		function inferFormat(filePath: string | undefined): string {
			const defaultFormat = "json";
			if (filePath === undefined) {
				return defaultFormat;
			}
			const ext = path.extname(filePath).slice(1);
			return formats.includes(ext) ? ext : defaultFormat;
		}

		function stringify(root: IRNode): string {
			if (argv.format === "auto") {
				argv.format = inferFormat(argv.output);
			}
			switch (argv.format.toLowerCase()) {
				case "json":
					return JSON.stringify(root);
				case "xml":
					return toXML(root);
				default:
					throw new Error(`Unknown file format "${argv.format}"`);
			}
		}

		function output(result: string): void {
			if (argv.output) {
				mkdirSync(path.dirname(argv.output), { recursive: true });
				writeFileSync(argv.output, result);
			} else {
				console.log(result);
			}
		}

		try {
			const [, parsed] = parseFiles(argv.file, argv.schema);
			const result = stringify(parsed);
			output(result);
		} catch (e) {
			console.error(chalk.red("Error: " + e.message), "\n");
		}
	}
};
