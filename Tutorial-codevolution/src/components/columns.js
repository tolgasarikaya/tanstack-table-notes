import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'

const columnHelper = createColumnHelper()

// export const columnDef = [
//     columnHelper.accessor('id', { header: 'Id' }),
//     {
//         accessorFn: (row) => `${row.first_name}`,
//         header: 'First Name',
//     },
//     {
//         accessorKey: 'last_name',
//         header: 'Last Name',
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
//     {
//         accessorKey: 'date',
//         header: 'Date',
//         //Cell formatting
//         cell: ({ getValue }) =>
//             moment(new Date(getValue())).format('DD/MM/yyyy'),
//     },
// ]

//////////////////// Cell Merge//////////////////////////

// export const columnDef = [
//     columnHelper.accessor('id', { header: 'Id' }),

//     {
//         accessorFn: (row) => `${row.first_name} ${row.last_name}`, //merging cells
//         header: 'Name',
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
//     {
//         accessorKey: 'date',
//         header: 'Date',
//     },
// ]

/////////////////////Grouping Headers/////////////////////////

// export const columnDef = [
//     columnHelper.accessor('id', { header: 'Id' }),
//     {
//         header: 'Name',
//         columns: [
//             {
//                 accessorFn: (row) => `${row.first_name}`,
//                 header: 'First Name',
//             },
//             {
//                 accessorKey: 'last_name',
//                 header: 'Last Name',
//             },
//         ],
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
//     {
//         accessorKey: 'date',
//         header: 'Date',
//     },
// ]

//////////////columnDef with Filters////////////////////
export const columnDef = [
    columnHelper.accessor('id', {
        header: 'Id',
        enableColumnFilter: false,
        enableGlobalFilter: false,
    }),
    {
        accessorFn: (row) => `${row.first_name}`,
        header: 'First Name',
    },
    {
        accessorKey: 'last_name',
        header: 'Last Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
        enableColumnFilter: false,
    },
    {
        accessorKey: 'date',
        header: 'Date',
        //Cell formatting
        cell: ({ getValue }) =>
            moment(new Date(getValue())).format('DD/MM/yyyy'),
    },
]
