import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {createCategorySchema, updateCategorySchema} from '@/app/manage/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCategoryAction, deleteCategoryAction, updateCategoryAction} from '@/app/manage/actions';
import {toast} from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';

type DialogDeleteCategoryProps = {
  categoryId: number;
};

export default function DialogDeleteCategory({ categoryId }: DialogDeleteCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    const response = await deleteCategoryAction(categoryId);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: "Something gone wrong!",
        description: response.error,
      });
    } else {
      toast({
        title: "Success!",
        description: "Category deleted."
      });
      toggleModal();
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>Delete Category</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete category
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this category?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='default' onClick={toggleModal}>Cancel</Button>
          <Button variant='destructive' onClick={onDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
