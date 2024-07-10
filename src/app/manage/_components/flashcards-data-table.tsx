'use client';

import {Flashcard} from '@/types/flashcard';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import {categoriesColumns} from '@/app/manage/_components/categories-columns';
import {flashcardColumns} from '@/app/manage/_components/flashcards-columns';
import {Category} from '@/types/category';

type FlashcardsDataTableProps = {
  flashcards: Flashcard[];
  categories: Category[];
}

export function FlashcardsDataTable({flashcards, categories}: FlashcardsDataTableProps) {
  const table = useReactTable({
    data: flashcards,
    columns: flashcardColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      categories: categories
    }
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={flashcardColumns.length + 1}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
