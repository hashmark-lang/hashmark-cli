import { assert } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { ParseCallback } from "yargs";
import { cli } from "../src/cli";
import { ConvertOptions } from "../src/commands/convert";

function parse(dest: string, args: string, cb: ParseCallback<ConvertOptions>): void {
	cli.parse(`convert ${args} --output ${dest} test/input/list.hm test/input/schema.json`, {}, cb);
}

function errorToString(err: Error | undefined): string {
	return err ? `${err.name}: ${err.message}` : "";
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "convert-"));
const xmlFile = path.join(tmpDir, "file.xml");
const jsonFile = path.join(tmpDir, "file.json");
const randomFile = path.join(tmpDir, "file.random");

function assertJSON(file: string): void {
	assert.doesNotThrow(() => JSON.parse(fs.readFileSync(file, "utf-8")));
}

describe("hm convert", () => {
	describe("--help", () => {
		it("-h prints a help message", done => {
			cli.parse("-h", {}, (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.isNotEmpty(out);
				done();
			});
		});

		it("--help prints a help message", done => {
			cli.parse("--help", {}, (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.isNotEmpty(out);
				done();
			});
		});
	});

	describe("--format", () => {
		it("defaults to JSON", done => {
			parse(randomFile, "", (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.equal(argv.format, "json");
				done();
			});
		});

		it("defaults to JSON in auto mode", done => {
			parse(randomFile, "-f auto", (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.equal(argv.format, "json");
				assertJSON(randomFile);
				done();
			});
		});

		it("infers XML when writing to a .xml file", done => {
			parse(xmlFile, "", (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.equal(argv.format, "xml");
				done();
			});
		});

		it("infers JSON when writing to a .json file", done => {
			parse(jsonFile, "", (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.equal(argv.format, "json");
				assertJSON(jsonFile);
				done();
			});
		});

		it("does not infer format from extension when --format is set", done => {
			parse(jsonFile, "--format xml", (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.equal(argv.format, "xml");
				done();
			});
		});
	});

	describe("--output", () => {
		it("creates intermediary directories if they do not exist", done => {
			const dest = path.join(tmpDir, "foo", "bar.xml");
			parse(dest, "", (err, argv, out) => {
				assert.isNotOk(err, errorToString(err));
				assert.isEmpty(out);
				assert(fs.existsSync(dest));
				done();
			});
		});
	});
});
