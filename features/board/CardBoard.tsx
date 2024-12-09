"use client";

// import styles from "./page.module.scss";
import { ChevronUp } from "lucide-react";
import { Ghost } from "lucide-react";

import { MarkdownEditorDialog } from "@/features";
import {
    Button,
    Card,
    Checkbox,
    LabelDatePicker,
    Separator,
} from "@/components/ui";

import "./features.scss";

function CardBoard() {
    return (
        <Card className="card">
            {/* 게시물 카드 제목 영역*/}
            <div className="title-area">
                <div className="input">
                    <Checkbox className="checkbox" />
                    <input
                        type="text"
                        placeholder="Board Title Here.."
                        disabled={true}
                    />
                </div>
                <Button variant={"ghost"} size={"icon"}>
                    <ChevronUp className="chevronup" />
                </Button>
            </div>
            {/* 캘린더 및 버튼 박스 영역 */}
            <div className="card-area">
                {/* 캘린더 박스 */}
                <div className="card-area__calendar">
                    <LabelDatePicker label={"From"} />
                    <LabelDatePicker label={"To"} />
                </div>
                {/* 버튼 박스 */}
                <div className="card-area__btn">
                    <Button variant={"ghost"}>Duplicate</Button>
                    <Button variant={"ghost"} className="red">
                        Delete
                    </Button>
                </div>
            </div>
            <Separator className="separator" />
            {/* Add Contents 버튼 영역 */}
            <MarkdownEditorDialog>
                <Button variant={"ghost"}>add content</Button>
            </MarkdownEditorDialog>
        </Card>
    );
}

export { CardBoard };
