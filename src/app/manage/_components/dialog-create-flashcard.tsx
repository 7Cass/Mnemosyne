'use client';

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {PlusIcon} from '@radix-ui/react-icons';
import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createFlashcardSchema} from '../schemas';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createFlashcardAction} from '@/app/manage/actions';
import {toast} from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {Category} from '@/types/category';
import {Textarea} from '@/components/ui/textarea';

type DialogCreateFlashcardProps = {
  categories: Category[];
};

export function  DialogCreateFlashcard({categories}: DialogCreateFlashcardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createFlashcardSchema>>({
    resolver: zodResolver(createFlashcardSchema),
    defaultValues: {
      question: '',
      answer: '',
      categoryId: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof createFlashcardSchema>) => {
    const response = await createFlashcardAction(values);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: 'Something gone wrong!',
        description: response.error,
      });
    } else {
      toast({
        title: 'Success!',
        description: 'Flashcard created.'
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
            Create a new flashcard
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="create-flashcard" className="space-y-4">
            <FormField control={form.control} name="question" render={({field}) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="What is Next.js?" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="answer" render={({field}) => (
              <FormItem>
                <FormLabel>Answer <small className="text-muted-foreground">(Max 150 characters)</small></FormLabel>
                <FormControl>
                  <Textarea placeholder="Next.js is a..." className="resize-none" maxLength={150}  {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
              control={form.control}
              name="categoryId"
              render={({field}) => (
                <FormItem className="w-1/2">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category"/>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem
                            key={index}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="create-flashcard" type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
