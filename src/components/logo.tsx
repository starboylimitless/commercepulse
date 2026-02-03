import { Zap } from "lucide-react";

export function CommercePulseLogo({ className, size = 32 }: { className?: string, size?: number }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className="relative flex items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/30"
                style={{ width: size, height: size }}
            >
                <Zap size={size * 0.6} className="fill-current" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-background rounded-full border-2 border-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                CommercePulse
            </span>
        </div>
    );
}
