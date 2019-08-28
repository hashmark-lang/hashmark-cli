import * as yargs from "yargs";
import { convert, ConvertOptions } from "./commands/convert";
import { types, TypesOptions } from "./commands/types";
import { validate, ValidateOptions } from "./commands/validate";

export type Command<Options> = Required<yargs.CommandModule<{}, Options>>;

/**
 * This type alias uses [distributive conditional types][1] to create a type that can be used in the tests.
 * For instance, CLI<A | B> yields Argv<A> | Argv<B> rather than Argv<A | B>
 *
 * [1]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types
 */
type CLI<Options> = Options extends any ? yargs.Argv<Options> : never;

export const cli: CLI<ValidateOptions | ConvertOptions | TypesOptions> = yargs
	.version()
	.command(convert)
	.command(validate)
	.command(types)
	.demandCommand(1, "Use one of the above commands")
	.recommendCommands()
	.help()
	.alias("h", "help")
	.alias("v", "version");
