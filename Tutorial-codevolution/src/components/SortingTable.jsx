import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import { columnDef } from './columns'
import dataJSON from './data.json'
import './table.css'
import { useMemo, useState } from 'react'

const SortingTable = () => {
    const finalData = useMemo(() => dataJSON, [])
    const finalColumnDef = useMemo(() => columnDef, [])

    const [sorting, setSorting] = useState([])

    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting: sorting },
        onSortingChange: setSorting,
    })
    return (
        <table>
            <thead>
                {tableInstance.getHeaderGroups().map((headerEl) => {
                    return (
                        <tr key={headerEl.id}>
                            {headerEl.headers.map((columnEl) => {
                                return (
                                    <th
                                        key={columnEl.id}
                                        colSpan={columnEl.colSpan}
                                        onClick={columnEl.column.getToggleSortingHandler()}
                                    >
                                        {columnEl.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  columnEl.column.columnDef
                                                      .header,
                                                  columnEl.getContext()
                                              )}
                                        {/* CODE FOR UP AND DOWN SORTING */}
                                        {
                                            { asc: '-UP', desc: '-DOWN' }[
                                                columnEl.column.getIsSorted() ??
                                                    null
                                            ]
                                        }
                                    </th>
                                )
                            })}
                        </tr>
                    )
                })}
            </thead>
            <tbody>
                {tableInstance.getRowModel().rows.map((rowEl) => {
                    return (
                        <tr key={rowEl.id}>
                            {rowEl.getVisibleCells().map((cellEl) => {
                                return (
                                    <td key={cellEl.id}>
                                        {flexRender(
                                            cellEl.column.columnDef.cell,
                                            cellEl.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SortingTable
