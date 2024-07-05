import Link from 'next/link';
import {CardStackIcon, MoonIcon, SunIcon} from '@radix-ui/react-icons';
import {Button} from '@/components/ui/button';
import {ThemeToggle} from '@/app/_components/ThemeToggle';

export default function Header() {
  return (
      <header
        className="max-h-20 px-8 py-4 gap-12 flex items-center justify-center mx-auto border-b border-border">
        <div className="flex-3 flex gap-2 items-center justify-center">
          <CardStackIcon className="h-10 w-10" />
        </div>
        <nav className="flex-1 flex items-center gap-2">
          <Link href={'/manage'}>
            <Button variant="outline">Manage</Button>
          </Link>
          <Link href={'/practice'}>
            <Button variant="outline">Practice</Button>
          </Link>
        </nav>
        <ThemeToggle />
      </header>
  );
}
