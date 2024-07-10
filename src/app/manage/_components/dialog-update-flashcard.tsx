import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {updateFlashcardSchema} from '@/app/manage/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {updateFlashcardAction} from '@/app/manage/actions';
import {toast} from '@/components/ui/use-toast';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Flashcard} from '@/types/flashcard';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Category} from '@/types/category';

type DialogUpdateFlashcardProps = {
  flashcard: Flashcard;
  categories: Category[];
};

export default function DialogUpdateFlashcard({flashcard, categories}: DialogUpdateFlashcardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof updateFlashcardSchema>>({
    resolver: zodResolver(updateFlashcardSchema),
    defaultValues: {
      question: flashcard.question,
      answer: flashcard.answer,
      categoryId: flashcard.categoryId
    }
  });

  const onSubmit = async (values: z.infer<typeof updateFlashcardSchema>) => {
    const response = await updateFlashcardAction(flashcard.id, values);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: 'Something gone wrong!',
        description: response.error,
      });
    } else {
      toast({
        title: 'Success!',
        description: 'Flashcard updated.'
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
        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>Update
          Flashcard</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update flashcard
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="update-flashcard" className="space-y-4">
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
                  <FormLabel>Category {flashcard.category?.name}</FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value.toString()} onValueChange={field.onChange}>
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
          <Button form="update-flashcard" type="submit">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
