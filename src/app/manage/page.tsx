import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {CategoriesDataTable} from '@/app/manage/_components/categories-data-table';
import {DialogCreateCategory} from '@/app/manage/_components/dialog-create-category';
import {getAllCategories} from '@/data-access/category';
import {FlashcardsDataTable} from '@/app/manage/_components/flashcards-data-table';
import {DialogCreateFlashcard} from '@/app/manage/_components/dialog-create-flashcard';
import {getAllFlashcards} from '@/data-access/flashcard';

export default async function Page() {
  const categories = await getAllCategories();
  const flashcards = await getAllFlashcards();

  return (
    <div className="lg:grid grid-cols-[40%,60%] flex flex-col gap-6 p-8">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <span className="font-bold text-3xl">Categories</span>
          <DialogCreateCategory/>
        </CardHeader>
        <CardContent>
          <CategoriesDataTable categories={categories}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <span className="font-bold text-3xl">Flashcards</span>
          <DialogCreateFlashcard categories={categories}/>
        </CardHeader>
        <CardContent>
          <FlashcardsDataTable flashcards={flashcards} categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
