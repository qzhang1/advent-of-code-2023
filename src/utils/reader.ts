import { createReadStream } from "node:fs";
import { Readable } from "node:stream";

export interface ConfigurableReader {
  fromFilePath: string;
  fromText: string;
}

export async function* readByLine(
  conf: ConfigurableReader
): AsyncGenerator<string> {
  let readStream: Readable;
  if (conf.fromFilePath) {
    readStream = createReadStream(conf.fromFilePath, "utf-8");
  } else {
    readStream = Readable.from(conf.fromText);
  }

  let content = "";
  for await (const chunk of readStream) {
    content += chunk;
    let linebreakIdx;
    while ((linebreakIdx = content.indexOf("\n")) >= 0) {
      yield content.substring(0, linebreakIdx);
      content = content.substring(linebreakIdx + 1);
    }
  }

  // last line of file
  if (content.length) {
    yield content;
  }
}
