import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {createCategorySchema, updateCategorySchema} from '@/app/manage/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCategoryAction, updateCategoryAction} from '@/app/manage/actions';
import {toast} from '@/components/ui/use-toast';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {PlusIcon} from '@radix-ui/react-icons';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Category} from '@/types/category';
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';

type DialogUpdateCategoryProps = {
  category: Category;
};

export default function DialogUpdateCategory({ category }: DialogUpdateCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name
    }
  });

  const onSubmit = async (values: z.infer<typeof updateCategorySchema>) => {
    const response = await updateCategoryAction(category.id, values);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: "Something gone wrong!",
        description: response.error,
      });
    } else {
      toast({
        title: "Success!",
        description: "Category updated."
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
        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>Update Category</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="update-category">
            <FormField control={form.control} name="name" render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
          </form>
        </Form>
        <DialogFooter>
          <Button form="update-category" type="submit">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
