---
title: Combobox
description: A filterable list of items that supports selection.
---

<script>
    import { APIReference, KbdTable, Callout, a as A } from '$docs/components'
    export let schemas
    export let keyboard
</script>

## Anatomy

- **Input**: The input that opens, closes, filters the list, and displays the selected value from
  the list
- **Menu**: The popover menu
- **Item**: The individual list item

## Usage

Several properties are required to create a combobox:

- `items`: The array of items that will be displayed in the menu.
- `filterFunction`: Filters the visible items based on the current input value.
- `itemToString`: Say your items are stored as objects. The combobox will need to understand how to
  create a string representation of each one. This stringified representation will be shown in the
  dropdown menu and the input value when an item has been selected.

<Callout>
Combobox uses a <A href="https://www.typescriptlang.org/docs/handbook/2/generics.html">generic type</A> to describe items. All input and return functions types that reference menu items be automatically inferred.
</Callout>

Create a new combobox using the `createCombobox` function.

```svelte {10-14}
<script lang="ts">
  import { createCombobox } from '@melt-ui/svelte'

  const flavors = [
    { name: 'Cookies & Cream', value: 'cookies-and-cream' },
    { name: 'Strawberry', value: 'strawberry' },
    { name: 'Chocolate', value: 'chocolate' }
  ]

  const { filteredItems, input, inputValue, item, menu, open } = createCombobox({
    items: flavors,
    filterFunction: (item, inputValue) => item.name.includes(inputValue),
    itemToString: (item) => item.name
  })
</script>

<label>
  <span>Choose your favorite ice cream flavor:</span>
  <input melt={$input} placeholder="Best flavor" value={$inputValue} />
</label>
<ul melt={$menu}>
  {#if $open}
    {#each $filteredItems as flavor, index (index)}
      <li melt={$item({ index, item: flavor })}>
        {flavor.name}
      </li>
    {/each}
  {/if}
</ul>
```

The `input` element is a sibling of the the `menu` and allows the user to filter visible items. The
menu will be visible when the `input` is focused. By wrapping the `input` with a `label` element,
the two are implicitly associated and don't need `for` and `id` attributes.

At this point, the combobox is fully functional. However, it's lacking many of the visual
affordances that users expect from a combobox menu such as:

- An arrow next to the input showing the open/close state of the menu

```svelte {4-8}
<label>
  <span>Choose your favorite ice cream flavor:</span>
  <input melt={$input} placeholder="Best flavor" value={$inputValue} />
  {#if $open}
    ⬆️
  {:else}
    ⬇️
  {/if}
</label>
<!-- ... -->
```

- A check mark next to the selected item

```svelte /isSelected/#hi {12-14}
<script lang="ts">
  const { filteredItems, input, inputValue, isSelected, item, menu, open } = createCombobox({
    /* ... */
  })
</script>

<!-- ... -->
<ul melt={$menu}>
  {#if $open}
    {#each $filteredItems as flavor, index (index)}
      <li melt={$item({ index, item: flavor })}>
        {#if $isSelected(flavor)}
          ✔️
        {/if}
        {flavor.name}
      </li>
    {/each}
  {/if}
</ul>
```

- An empty state when no items match the filter function

```svelte {4-12}
<!-- ... -->
<ul melt={$menu}>
  {#if $open}
    {#if $filteredItems.length > 0}
      {#each $filteredItems as flavor, index (index)}
        <li melt={$item({ index, item: flavor })}>
          {flavor.name}
        </li>
      {/each}
    {:else}
      <li>No results found</li>
    {/if}
  {/if}
</ul>
```

## API Reference

<APIReference {schemas} />

## Accessibility

Adheres to the [WAI-ARIA 1.2 Combobox design pattern](https://www.w3.org/TR/wai-aria-1.2/#combobox)

<KbdTable {keyboard} />
