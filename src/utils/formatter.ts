import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export function formatJSON(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
}

export function formatXML(input: string): string {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
  });
  const parsed = parser.parse(input);
  return builder.build(parsed);
}