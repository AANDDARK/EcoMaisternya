import { Recycle } from "lucide-react";
import Link from "next/link";
interface Props {
    name: string;
    describe: string;
    icon: React.ReactNode
    link: string
}
export default function HomeSection(props: Props){
    return (

        <Link href={`/${props.link}`} className="group rounded-xl border border-border bg-card p-6 flex flex-col gap-3 hover:border-primary transition-colors">
          <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
            {props.icon}
          </div>
          <div>
            <p className="font-medium text-foreground">{props.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {props.describe}
            </p>
          </div>
        </Link>

    )
}