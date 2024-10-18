import { XMLParser } from 'fast-xml-parser';

export function parseJSON(input: string): object {
  return JSON.parse(input);
}

export function parseXML(input: string): object {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  return parser.parse(input);
}