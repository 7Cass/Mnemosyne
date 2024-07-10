import {ColumnDef} from '@tanstack/react-table';
import {Flashcard} from '@/types/flashcard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import DialogDeleteFlashcard from '@/app/manage/_components/dialog-delete-flashcard';
import DialogUpdateFlashcard from '@/app/manage/_components/dialog-update-flashcard';

export const flashcardColumns: ColumnDef<Flashcard>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'question',
    header: 'Question',
  },
  {
    accessorKey: 'answer',
    header: 'Answer',
  },
  {
    accessorKey: 'slug',
    header: 'Slug'
  },
  {
    accessorKey: 'category',
    header: 'Category',
    accessorFn: originalRow => {
      const { category } = originalRow;
      return `${category?.name || '-'}`
    }
  },
  {
    id: 'actions',
    cell: ({row, table}) => {
      const flashcard = row.original;
      const categories = (table.options?.meta as any)?.categories;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <DotsHorizontalIcon className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogUpdateFlashcard flashcard={flashcard} categories={categories} />
            <DropdownMenuSeparator/>
            <DialogDeleteFlashcard flashcardId={flashcard.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
