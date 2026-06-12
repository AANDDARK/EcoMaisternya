import RecyclingMap from "@/components/RecyclingMap";
import { Recycle } from "lucide-react";

export default function Page() {
  return (
    <div>
      {/* Hero секція */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <Recycle size={16} />
          <span>Екологічна ініціатива</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Контейнери для переробки
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Контейнери для переробки — це спеціальні збірні точки для старих, але чистих речей,
          придатних до вторинної переробки. Сюди можна принести одяг, текстиль, папір, скло,
          пластик та інші матеріали, які ще можуть отримати нове життя.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Здаючи речі до контейнерів, ви зменшуєте кількість відходів на сміттєзвалищах,
          економите природні ресурси та підтримуєте місцеві переробні підприємства.
          Це простий крок, який робить реальний внесок у збереження довкілля.
        </p>
      </div>

      {/* Мапа на всю ширину */}
      <div className="w-full h-[520px]">
        <RecyclingMap />
      </div>
    </div>
  );
}