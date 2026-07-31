'use client';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { Column } from '@tanstack/react-table';
import DebouncedInput from '../../../components/ui/debounced-input';
import { useGrid } from '../../contexts/GridContext';

const HeaderFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  'use no memo';
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const { isFetching } = useGrid();

  const selectValue =
    !isFetching && filterVariant === 'select'
      ? Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000)
      : [];

  return column.getCanFilter() ? (
    <Box
      sx={{
        p: 0.5,
        borderTop: 1,
        borderColor: 'divider',
        width: '100%',
      }}
    >
      {filterVariant === 'range' ? (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
            placeholder={`Min`}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 28,
              },
              '& .MuiOutlinedInput-input': {
                padding: '4px 8px',
                fontSize: 13,
              },
            }}
            fullWidth
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
            placeholder={`Max`}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 28,
              },
              '& .MuiOutlinedInput-input': {
                padding: '4px 8px',
                fontSize: 13,
              },
            }}
            fullWidth
          />
        </Box>
      ) : filterVariant === 'select' ? (
        <Select
          fullWidth
          size="small"
          value={columnFilterValue?.toString() ?? ''}
          onChange={(e) =>
            column.setFilterValue(
              e.target.value === 'all' ? undefined : e.target.value,
            )
          }
          displayEmpty
          sx={{
            height: 28,
            '& .MuiSelect-select': {
              padding: '4px 8px',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {selectValue.map((value) => {
            const stringValue =
              typeof value === 'boolean' ? String(value) : value;
            return (
              <MenuItem
                value={stringValue}
                key={stringValue}
                sx={{ textTransform: 'capitalize' }}
              >
                {stringValue}
              </MenuItem>
            );
          })}
        </Select>
      ) : filterVariant &&
        [
          'text',
          'time',
          'date',
          'datetime-local',
          'month',
          'week',
          'number',
          'tel',
          'url',
          'color',
          'search',
        ].includes(filterVariant) ? (
        <DebouncedInput
          onChange={(value) => column.setFilterValue(value)}
          placeholder="Search..."
          type={filterVariant}
          value={(columnFilterValue ?? '') as string}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 28,
            },
            '& .MuiOutlinedInput-input': {
              padding: '4px 8px',
              fontSize: 13,
            },
          }}
          fullWidth
        />
      ) : (
        <Box sx={{ height: 28, opacity: 0, visibility: 'hidden' }} />
      )}
    </Box>
  ) : null;
};

export default HeaderFilter;
