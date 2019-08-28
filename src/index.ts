#!/usr/bin/env node
import chalk from "chalk";
import { cli } from "./cli";

try {
	cli.parse();
} catch (e) {
	if (e instanceof Error) {
		console.error(chalk.redBright(e.message));
	}
	process.exit(1);
}
