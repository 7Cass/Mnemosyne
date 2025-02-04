import {ColumnDef} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import { Category } from '@/types/category';
import DialogUpdateCategory from '@/app/manage/_components/dialog-update-category';
import DialogDeleteCategory from '@/app/manage/_components/dialog-delete-category';

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'slug',
    header: 'Slug'
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <DotsHorizontalIcon className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogUpdateCategory category={category}/>
            <DropdownMenuSeparator/>
            <DialogDeleteCategory categoryId={category.id}/>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
