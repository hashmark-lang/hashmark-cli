#!/usr/bin/env node

import * as yargs from "yargs";
import { convert } from "./commands/convert";
import { validate } from "./commands/validate";

export type CommandModule<Options> = Required<yargs.CommandModule<{}, Options>>;

export const cli = yargs
	.version()
	.command(convert)
	.command(validate)
	.demandCommand(1, "Use one of the above commands")
	.recommendCommands()
	.help()
	.alias("h", "help")
	.alias("v", "version");

cli.parse();
