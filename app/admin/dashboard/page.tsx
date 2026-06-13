import AddDateForm from "@/components/admin/AddDateForm";
import OrdersPannel from "@/components/admin/OrdersPannel";
import PlaceForm from "@/components/admin/placeForm";
import ProductForm from "@/components/admin/productForm";
import RemovePanel from "@/components/admin/RemovePanel";
import RerecyclingBasketForm from "@/components/admin/rerecyclingBasketForm";
import { Separator } from "@/components/ui/separator";
import { MapPin, Recycle, ShoppingBag, CalendarDays, Trash2 } from "lucide-react";

function Section({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Icon size={16} />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10">

      <div>
        <h1 className="text-3xl font-bold text-foreground">Адмін панель</h1>
        <p className="text-muted-foreground mt-1">Керування контентом сайту</p>
      </div>
      <Separator />
        <OrdersPannel />
      <Separator />

      {/* Додавання */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-foreground">Додати</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Контейнер для переробки" icon={Recycle}>
            <RerecyclingBasketForm />
          </Section>
          <Section title="Товар" icon={ShoppingBag}>
            <ProductForm />
          </Section>
          <Section title="Місце проведення" icon={MapPin}>
            <PlaceForm />
          </Section>
          <Section title="День події" icon={CalendarDays}>
            <AddDateForm />
          </Section>
        </div>
      </div>

      <Separator />

      {/* Видалення */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-foreground">Видалити</h2>
        <Section title="Видалення записів" icon={Trash2}>
          <RemovePanel />
        </Section>
      </div>

    </div>
  );
}