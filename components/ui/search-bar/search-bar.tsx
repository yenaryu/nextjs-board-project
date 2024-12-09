import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "bg-[#F2F2F2] flex h-10 items-center rounded-md border-input pl-3 text-sm focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
                    className
                )}
            >
                <SearchIcon className="h-[18px] w-[18px]" />
                <input
                    {...props}
                    type="search"
                    ref={ref}
                    className="bg-transparent w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        );
    }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
