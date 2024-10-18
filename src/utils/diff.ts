import { diffLines } from 'diff';
import { formatJSON, formatXML } from './formatter';

function createDiffOutput(diff: any[]): string {
  return diff
    .map((part) => {
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      const prefix = part.added ? '+' : part.removed ? '-' : ' ';
      return part.value
        .split('\n')
        .map((line: string) => `${prefix} ${line}`)
        .join('\n');
    })
    .join('\n');
}

export function diffJSON(input1: string, input2: string): string {
  const formatted1 = formatJSON(input1);
  const formatted2 = formatJSON(input2);
  const diff = diffLines(formatted1, formatted2);
  return createDiffOutput(diff);
}

export function diffXML(input1: string, input2: string): string {
  const formatted1 = formatXML(input1);
  const formatted2 = formatXML(input2);
  const diff = diffLines(formatted1, formatted2);
  return createDiffOutput(diff);
}