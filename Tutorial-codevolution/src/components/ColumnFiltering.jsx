import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import { columnDef } from './columns'
import dataJSON from './data.json'
import './table.css'
import { useMemo, useState } from 'react'
import Filter from './FilterFunction'

const ColumnFiltering = () => {
    const finalData = useMemo(() => dataJSON, [])
    const finalColumnDef = useMemo(() => columnDef, [])

    const defaultColumn = useMemo(() => {
        return { youTubeProp: 'hello world' }
    }, [])

    const [columnFilters, setColumnFilters] = useState([])

    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,
        defaultColumn: defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { columnFilters: columnFilters },
        onColumnFiltersChange: setColumnFilters,
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
                                    >
                                        {columnEl.isPlaceholder ? null : (
                                            <>
                                                {flexRender(
                                                    columnEl.column.columnDef
                                                        .header,
                                                    columnEl.getContext()
                                                )}
                                                {columnEl.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter
                                                            column={
                                                                columnEl.column
                                                            }
                                                            table={
                                                                tableInstance
                                                            }
                                                        />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
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

export default ColumnFiltering
