import type { createCombobox } from './create';

export type CreateComboboxProps<T> = {
	/** The list of items to display in the combobox. */
	items: T[];
	/**
	 * Determines behavior when scrolling items into view.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#block
	 */
	scrollAlignment?: 'nearest' | 'center';
	/**
	 * Predicate function to filter the visible items. When the user types,
	 * the filterFunction will be run on each item along with the current
	 * input value. If the predicate returns true, the item will be displayed.
	 * @param item the current item being filtered.
	 * @param value the current input value.
	 * @returns whether the item should be visible.
	 */
	filterFunction: (item: T, value: string) => boolean;
	/**
	 * A function that returns the string representation of an item.
	 * @param item the current item being stringified.
	 * @returns an item string.
	 */
	itemToString: (item: T) => string;
	loop?: boolean;
};

export type ComboboxItemProps<T> = {
	/** The item. */
	item: T;
	/** Array index of the item. */
	index: number;
	/** Is the item disabled? */
	disabled?: boolean;
};

export type CreateComboboxReturn = ReturnType<typeof createCombobox>;
