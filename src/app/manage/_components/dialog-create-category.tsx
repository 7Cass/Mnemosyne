'use client';

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {PlusIcon} from '@radix-ui/react-icons';
import {useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createCategorySchema} from '../schemas';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCategoryAction} from '@/app/manage/actions';
import {toast, useToast} from '@/components/ui/use-toast';

export function DialogCreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {
    const response = await createCategoryAction(values);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: "Something gone wrong!",
        description: response.error,
      });
    } else {
      toast({
        title: "Success!",
        description: "Category created."
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
        <Button variant="outline" size="icon">
          <PlusIcon/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="create-category">
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
          <Button form="create-category" type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
