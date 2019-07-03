import { Block, parse, toXML } from "@hashmark/parser";
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { CommandModule } from "..";

interface ConvertOptions {
	file?: string;
	format: string;
	output?: string;
}

const formats = ["json", "xml"];

export const convert: CommandModule<ConvertOptions> = {
	command: "convert [options] <file>",
	describe: "Convert Hashmark files",
	aliases: [],

	builder: yargs =>
		yargs
			.option("format", {
				decription: "Output format of the AST",
				alias: "f",
				type: "string",
				choices: ["auto", ...formats],
				default: "auto",
				defaultDescription: `"auto": infers the format from the output file. Defaults to "json"`,
				coerce: (v: string) => v.toLowerCase()
			})
			.option("output", {
				alias: "o",
				description: "Write output to a file",
				type: "string",
				normalize: true
			})
			.positional("file", {
				type: "string",
				description: "Path to a Hashmark file",
				demandOption: true,
				normalize: true
			}),

	handler: argv => {
		function getFile(): string {
			if (!argv.file) {
				throw new Error("An input file must be specified");
			}
			return fs.readFileSync(argv.file, "utf-8");
		}

		function inferFormat(filePath: string | undefined, defaultFormat: string): string {
			if (filePath === undefined) {
				return defaultFormat;
			}
			const ext = path.extname(filePath).slice(1);
			return formats.includes(ext) ? ext : defaultFormat;
		}

		function stringify(root: Block): string {
			if (argv.format === "auto") {
				argv.format = inferFormat(argv.output, "json");
			}
			switch (argv.format.toLowerCase()) {
				case "json":
					return JSON.stringify(root, null, "\t");
				case "xml":
					return toXML(root);
				default:
					throw new Error(`Unknown file format "${argv.format}"`);
			}
		}

		function output(result: string): void {
			if (argv.output) {
				fs.writeFileSync(argv.output, result);
			} else {
				console.log(result);
			}
		}

		try {
			const parsed = parse(getFile());
			const result = stringify(parsed);
			output(result);
		} catch (e) {
			console.error(chalk.red("Error: " + e.message));
			console.log();
		}
	}
};
