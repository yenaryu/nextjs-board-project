"use client";

import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui";
import { Calendar as CalendarIcon } from "lucide-react";

function BasicDatePicker() {
    const [date, setDate] = useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn("", !date && "text-muted-foreground")}
                >
                    <CalendarIcon className="calendar-icon" />
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span>날짜를 선택하세요.</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export { BasicDatePicker };
