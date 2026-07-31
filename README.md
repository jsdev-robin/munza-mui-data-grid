# @munza/mui-data-grid

A feature-rich, headless-powered data grid for React — built on [TanStack Table v8](https://tanstack.com/table) and [MUI](https://mui.com/). Sorting, filtering, pagination, row selection, column/row pinning, resizing, drag-and-drop column ordering, expandable rows, and split (frozen) columns — all out of the box.

**Live Demo:** [https://munza-mui-data-grid.jsdevs.xyz/](https://munza-mui-data-grid.jsdevs.xyz/)

## Features

- Global search + per-column filtering (text, range)
- Multi-column sorting
- Client-side & manual (server-side) pagination
- Row selection with checkboxes
- Column pinning (left / right) and row pinning (top / bottom)
- Resizable & drag-to-reorder columns (`@dnd-kit`)
- Split view for frozen left/right columns
- Expandable rows with custom sub-components
- Persists per-grid layout (column order, sizing, visibility, pinning) via a storage key
- Built-in loading, error, and empty states
- Fully styled with MUI — themeable out of the box
- Bring your own toolbar actions via `topRightSlot`

## Installation

```bash
npm install @munza/mui-data-grid
```

### Peer Dependencies

Make sure the following are installed in your project:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Quick Start

```tsx
import { Grid, useGridState, type ColumnDef } from '@munza/mui-data-grid';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  { id: 'id', accessorKey: 'id', header: () => 'ID' },
  { id: 'name', accessorKey: 'name', header: () => 'Name' },
  { id: 'email', accessorKey: 'email', header: () => 'Email' },
];

const App = () => {
  const { state, handlers } = useGridState();

  return (
    <Grid
      payload={{ data: users, total: users.length }}
      columns={columns}
      state={state}
      {...handlers}
    />
  );
};
```

## Server-Side (Manual) Pagination, Sorting & Filtering

```tsx
const { state, handlers, rowSelection } = useGridState();

const { data, isLoading, isError, refetch, isFetching } = useUsersQuery({
  queryString: URLSearch(state),
});

<Grid
  payload={{ data: data?.rows ?? [], total: data?.total ?? 0 }}
  columns={columns}
  manualPagination
  isLoading={isLoading}
  isError={isError}
  isFetching={isFetching}
  refetch={refetch}
  state={state}
  {...handlers}
  height="55vh"
/>;
```

## Toolbar Actions

Add custom action buttons to the toolbar via `topRightSlot`:

```tsx
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

<Grid
  columns={columns}
  payload={{ data, total }}
  state={state}
  {...handlers}
  topRightSlot={
    <Stack direction="row" spacing={1}>
      <Tooltip title="Refresh">
        <IconButton size="small" onClick={refetch}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add">
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  }
/>;
```

## Working with Row Selection

Use the `pluckSelected` utility to extract a field from all selected rows:

```tsx
import { pluckSelected } from '@munza/mui-data-grid';

const { rowSelection } = useGridState();

const selectedIds = pluckSelected(data, rowSelection, 'id');
// => ["V001", "V003", "V004"]
```

## API Reference

### `<Grid />` Props

| Prop                    | Type                                       | Default   | Description                                                      |
| ----------------------- | ------------------------------------------ | --------- | ---------------------------------------------------------------- |
| `payload`               | `{ data: T[]; total: number }`             | —         | Row data and total row count                                     |
| `columns`               | `ColumnDef<T>[]`                           | —         | Column definitions (required)                                    |
| `state`                 | `Partial<TableState>`                      | —         | Controlled table state (from `useGridState`)                     |
| `onColumnFiltersChange` | `OnChangeFn<ColumnFiltersState>`           | —         | Column filter change handler                                     |
| `onPaginationChange`    | `OnChangeFn<PaginationState>`              | —         | Pagination change handler                                        |
| `onSortingChange`       | `OnChangeFn<SortingState>`                 | —         | Sorting change handler                                           |
| `onRowSelectionChange`  | `OnChangeFn<RowSelectionState>`            | —         | Row selection change handler                                     |
| `setGlobalFilter`       | `Dispatch<SetStateAction<string>>`         | —         | Global search setter                                             |
| `manualPagination`      | `boolean`                                  | `false`   | Enables server-side pagination                                   |
| `isLoading`             | `boolean`                                  | —         | Shows skeleton loading rows                                      |
| `isError`               | `boolean`                                  | —         | Shows the error state                                            |
| `isFetching`            | `boolean`                                  | —         | Shows a background refetch indicator                             |
| `refetch`               | `() => void`                               | —         | Retry/refresh callback                                           |
| `renderSubComponent`    | `(props: { row: Row<T> }) => ReactElement` | —         | Custom content for expanded rows                                 |
| `getRowCanExpand`       | `(row: Row<T>) => boolean`                 | —         | Controls whether a row can expand                                |
| `enableRowSelection`    | `boolean`                                  | `true`    | Enables/disables row selection                                   |
| `height`                | `string`                                   | `'65vh'`  | Fixed height of the scrollable table body                        |
| `isToolbar`             | `boolean`                                  | `true`    | Shows/hides the built-in toolbar                                 |
| `isPagination`          | `boolean`                                  | `true`    | Shows/hides the built-in pagination controls                     |
| `name`                  | `string`                                   | `'munza'` | Storage key for persisting per-grid layout                       |
| `topRightSlot`          | `React.ReactNode`                          | —         | Custom content on the right of the toolbar (e.g. action buttons) |
| `children`              | `React.ReactNode`                          | —         | Extra content rendered above the table (e.g. bulk-action bars)   |

### `useGridState()`

Manages all controlled state required by `<Grid />`.

```tsx
const { state, handlers, rowSelection } = useGridState();
```

Returns:

- `state` — `{ columnFilters, globalFilter, pagination, sorting, rowSelection }`
- `handlers` — `{ onColumnFiltersChange, onPaginationChange, onSortingChange, setGlobalFilter, onRowSelectionChange }`
- `rowSelection` — the current selection map, exposed directly for convenience

### `pluckSelected(data, rowSelection, field)`

Extracts a field's value from every currently selected row.

```tsx
pluckSelected(data, rowSelection, 'id'); // => string[]
```

### `URLSearch(queryArgs)`

Serializes TanStack Table state into a MongoDB/Express-style query string.

```tsx
URLSearch({
  pagination: { pageIndex: 0, pageSize: 20 },
  columnFilters: [{ id: 'status', value: 'active' }],
  sorting: [{ id: 'year', desc: true }],
  globalFilter: 'toyota',
});
// => "?page=1&limit=20&status=active&sort=-year&q=toyota"
```

## Peer Dependency Versions

| Package                     | Version |
| --------------------------- | ------- |
| `react` / `react-dom`       | `^19.x` |
| `@mui/material`             | `^9.x`  |
| `@mui/icons-material`       | `^9.x`  |
| `@emotion/react` / `styled` | `^11.x` |

## License

MIT
