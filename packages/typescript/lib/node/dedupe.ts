import type * as ts from 'typescript';

export function dedupeReferencedSymbols<T extends ts.ReferencedSymbol>(items: T[]): T[] {
	return dedupe(items, item => [
		item.definition.fileName,
		item.definition.textSpan.start,
		item.definition.textSpan.length,
	].join(':'));
}

export function dedupeDocumentSpans<T extends ts.DocumentSpan>(items: T[]): T[] {
	return dedupe(items, item => [
		item.fileName,
		item.textSpan.start,
		item.textSpan.length,
	].join(':'));
}

function dedupe<T>(items: T[], getKey: (item: T) => string): T[] {
	const map = new Map<string, T>();
	for (const item of items.reverse()) {
		map.set(getKey(item), item);
	}
	return [...map.values()];
}
