"use client";

import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    LabelDatePicker,
    Separator,
} from "@/components/ui";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "./features.scss";

interface Props {
    children: React.ReactNode;
}

function MarkdownEditorDialog({ children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader className="dialog__header">
                    <DialogTitle>
                        <div className="header-box">
                            <Checkbox className="checkbox" />
                            <input
                                type="text"
                                placeholder="게시물의 제목을 입력해주세요."
                            />
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        마크다운 에디터를 사용하여 TODO-BOARD를 예쁘게
                        꾸며보세요.
                    </DialogDescription>
                </DialogHeader>

                <div className="dialog__date">
                    <LabelDatePicker label={"From"} />
                    <LabelDatePicker label={"To"} />
                </div>

                <Separator />
                {/* 마크다운 에디터 영역 */}
                <MarkdownEditor className="dialog__markdown" />
                <DialogFooter>
                    {/* 버튼 취소 */}
                    <DialogClose asChild>
                        <Button type="submit" variant={"outline"}>
                            취소
                        </Button>
                    </DialogClose>
                    <Button type="submit" className="button-org full">
                        등록
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export { MarkdownEditorDialog };
