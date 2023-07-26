import { Temporal } from "js-temporal/";

export function logRequest(request: Request) {
  const { headers, url } = request;
  const { pathname } = new URL(url);
  const country = headers.get("cf-ipcountry") ?? "unknown";
  const dateTime = Temporal.Now.plainDateTimeISO();
  const dateTimeString = `${dateTime.toPlainDate().toString()} ${
    dateTime.toLocaleString("en-GB", { timeStyle: "short" })
  }`;
  console.log(`${dateTimeString} - [${pathname}], within: ${country}`);
}
