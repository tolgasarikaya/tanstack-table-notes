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

const GlobalFiltering = () => {
    const finalData = useMemo(() => dataJSON, [])
    const finalColumnDef = useMemo(() => columnDef, [])

    const [filtering, setFiltering] = useState('')

    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter: filtering },
        onGlobalFilterChange: setFiltering,
    })
    return (
        <>
            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
            <hr></hr>
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
                                            {columnEl.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      columnEl.column.columnDef
                                                          .header,
                                                      columnEl.getContext()
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
        </>
    )
}

export default GlobalFiltering
