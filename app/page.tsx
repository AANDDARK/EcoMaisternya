import HomeSection from "@/components/HomeSection";
import { Recycle, CalendarDays, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-16">

      {/* Hero */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Recycle size={16} />
          <span>Екологічна платформа</span>
        </div>
        <h1 className="text-5xl font-bold text-foreground leading-tight">
          ЕкоМайстерня
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Платформа для тих, хто хоче діяти. Ми об'єднуємо людей навколо
          переробки, екологічних подій та свідомого споживання — все в одному місці,
          для вашого міста.
        </p>
        <div className="flex gap-3 mt-2">
          <Button asChild>
            <Link href="/rerecycling">Знайти контейнер</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/event-board">Події поруч</Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Що ми робимо */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-foreground">Що таке ЕкоМайстерня</h2>
        <p className="text-muted-foreground leading-relaxed">
          ЕкоМайстерня — це міський інструмент для екологічно свідомих людей.
          Тут можна дізнатися де здати речі на переробку, знайти найближчі екологічні
          заходи, купити або обміняти корисні товари у крамниці, а також залишити
          оголошення для спільноти. Ми віримо, що маленькі дії кожного формують
          великі зміни для всіх.
        </p>
      </div>

      {/* Секції */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HomeSection link="rerecycling" name="Контейнери" describe="Карта пунктів збору старих речей та матеріалів для переробки у вашому місті." icon={<Recycle size={20} className="text-secondary-foreground" />} />
        <HomeSection link="event-board" name="Дошка подій" describe="Екологічні заходи, суботники, воркшопи та лекції поруч із вами." icon={<CalendarDays size={20} className="text-secondary-foreground" />} />
        <HomeSection link="market" name="Крамниця" describe="Товари з перероблених матеріалів та еко-продукти від місцевих виробників." icon={<ShoppingBag size={20} className="text-secondary-foreground" />} />
      </div>

    </div>
  );
}