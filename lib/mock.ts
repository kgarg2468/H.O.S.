import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { JsonValue, MockData } from './types';

const resolveMockPath = (filePath: string): string =>
  path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);

export const loadMockJson = async <T extends JsonValue = JsonValue>(
  filePath: string
): Promise<MockData<T>> => {
  const resolvedPath = resolveMockPath(filePath);
  const contents = await readFile(resolvedPath, 'utf8');
  return JSON.parse(contents) as MockData<T>;
};

export const loadMockJsonSync = <T extends JsonValue = JsonValue>(
  filePath: string
): MockData<T> => {
  const resolvedPath = resolveMockPath(filePath);
  const contents = readFileSync(resolvedPath, 'utf8');
  return JSON.parse(contents) as MockData<T>;
};

export const defineMockData = <T extends JsonValue>(data: T): MockData<T> => data;
