import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {CategoriesDataTable} from '@/app/manage/_components/categories-data-table';
import {categoriesMock} from '@/mocks/categories-mock';
import {DialogCreateCategory} from '@/app/manage/_components/dialog-create-category';
import {getAllCategories} from '@/data-access/category';

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="lg:grid grid-cols-[40%,60%] flex flex-col gap-6 p-8">
      <Card className="">
        <CardHeader className="flex flex-row justify-between items-center">
          <span className="font-bold text-3xl">Categories</span>
          <DialogCreateCategory />
        </CardHeader>
        <CardContent>
          <CategoriesDataTable categories={categories}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <span className="font-bold text-3xl">Flashcards</span>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
