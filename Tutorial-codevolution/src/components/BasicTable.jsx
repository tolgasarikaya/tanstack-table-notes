import {
    flexRender,
    useReactTable,
    getCoreRowModel,
} from '@tanstack/react-table'
import { columnDef } from './columns'
import dataJSON from './data.json'
import './table.css'
import { useMemo } from 'react'

const BasicTable = () => {
    const finalData = useMemo(() => dataJSON, [])
    const finalColumnDef = useMemo(() => columnDef, [])

    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,
        getCoreRowModel: getCoreRowModel(),
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
    )
}

export default BasicTable
