import {useState} from 'react';
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
import {deleteFlashcardAction} from '@/app/manage/actions';

type DialogDeleteFlashcardProps = {
  flashcardId: number;
};

export default function DialogDeleteFlashcard({ flashcardId }: DialogDeleteFlashcardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    const response = await deleteFlashcardAction(flashcardId);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: "Something gone wrong!",
        description: response.error,
      });
    } else {
      toast({
        title: "Success!",
        description: "Flashcard deleted."
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
        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>Delete Flashcard</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete flashcard
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this flashcard?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='default' onClick={toggleModal}>Cancel</Button>
          <Button variant='destructive' onClick={onDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
