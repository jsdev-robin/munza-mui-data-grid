import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { dummyVehicles, type Vehicle } from './data/dummyData';

const App = () => {
  const columns = useMemo<ColumnDef<Vehicle, unknown>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: () => <div>ID</div>,
        meta: {
          filterVariant: 'text',
        },
        enableHiding: false,
      },
      {
        id: 'driver',
        accessorKey: 'driver',
        cell: (info) => info.getValue(),
        header: () => <div>Driver</div>,
        meta: {
          filterVariant: 'range',
        },
      },
      {
        id: 'vehicle',
        accessorKey: 'vehicle',
        cell: (info) => info.getValue(),
        header: () => <div>Vehicle</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'vin',
        accessorKey: 'vin',
        cell: (info) => info.getValue(),
        header: () => <div>VIN</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'type',
        accessorKey: 'type',
        cell: (info) => info.getValue(),
        header: () => <div>Type</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'status',
        accessorKey: 'status',
        cell: (info) => info.getValue(),
        header: () => <div>Status</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'currentMeter',
        accessorKey: 'currentMeter',
        cell: (info) => info.getValue(),
        header: () => <div>Current Meter</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'fuel',
        accessorKey: 'fuel',
        cell: (info) => info.getValue(),
        header: () => <div>Fuel</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'drivingTime',
        accessorKey: 'drivingTime',
        cell: (info) => info.getValue(),
        header: () => <div>Driving Time</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'license',
        accessorKey: 'license',
        cell: (info) => info.getValue(),
        header: () => <div>License</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'odometer',
        accessorKey: 'odometer',
        cell: (info) => info.getValue(),
        header: () => <div>Odometer</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'year',
        accessorKey: 'year',
        cell: (info) => info.getValue(),
        header: () => <div>Year</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'make',
        accessorKey: 'make',
        cell: (info) => info.getValue(),
        header: () => <div>Make</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'model',
        accessorKey: 'model',
        cell: (info) => info.getValue(),
        header: () => <div>Model</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'color',
        accessorKey: 'color',
        cell: (info) => info.getValue(),
        header: () => <div>Color</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'assignedDate',
        accessorKey: 'assignedDate',
        cell: (info) => info.getValue(),
        header: () => <div>Assigned Date</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'lastMaintenanceDate',
        accessorKey: 'lastMaintenanceDate',
        cell: (info) => info.getValue(),
        header: () => <div>Last Maintenance</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'nextMaintenanceDate',
        accessorKey: 'nextMaintenanceDate',
        cell: (info) => info.getValue(),
        header: () => <div>Next Maintenance</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'insuranceProvider',
        accessorKey: 'insuranceProvider',
        cell: (info) => info.getValue(),
        header: () => <div>Insurance Provider</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'insurancePolicyNumber',
        accessorKey: 'insurancePolicyNumber',
        cell: (info) => info.getValue(),
        header: () => <div>Policy Number</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'registrationExpiry',
        accessorKey: 'registrationExpiry',
        cell: (info) => info.getValue(),
        header: () => <div>Registration Expiry</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'fuelType',
        accessorKey: 'fuelType',
        cell: (info) => info.getValue(),
        header: () => <div>Fuel Type</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'transmission',
        accessorKey: 'transmission',
        cell: (info) => info.getValue(),
        header: () => <div>Transmission</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'engineCapacity',
        accessorKey: 'engineCapacity',
        cell: (info) => info.getValue(),
        header: () => <div>Engine Capacity</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'seatingCapacity',
        accessorKey: 'seatingCapacity',
        cell: (info) => info.getValue(),
        header: () => <div>Seating Capacity</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'cargoCapacity',
        accessorKey: 'cargoCapacity',
        cell: (info) => info.getValue(),
        header: () => <div>Cargo Capacity</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'gpsTrackingId',
        accessorKey: 'gpsTrackingId',
        cell: (info) => info.getValue(),
        header: () => <div>GPS ID</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'fleetGroup',
        accessorKey: 'fleetGroup',
        cell: (info) => info.getValue(),
        header: () => <div>Fleet Group</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'costPerMile',
        accessorKey: 'costPerMile',
        cell: (info) => info.getValue(),
        header: () => <div>Cost Per Mile</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'totalMiles',
        accessorKey: 'totalMiles',
        cell: (info) => info.getValue(),
        header: () => <div>Total Miles</div>,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'notes',
        accessorKey: 'notes',
        cell: (info) => info.getValue(),
        header: () => <div>Notes</div>,
        meta: {
          filterVariant: 'text',
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: dummyVehicles.slice(0, 10),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section
      style={{
        padding: 10,
      }}
    >
      <Paper>
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={(theme) => ({
              '& .MuiTableCell-root': {
                border: `1px solid ${theme.palette.divider}`,
              },
            })}
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                        maxWidth: header.getSize(),
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={10}
          page={10}
          onPageChange={() => {
            console.log('ok');
          }}
          onRowsPerPageChange={() => {
            console.log('ok');
          }}
        />
      </Paper>
    </section>
  );
};

export default App;
