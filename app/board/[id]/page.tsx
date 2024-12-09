"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

import {AlertPopup, CardBoard} from "@/features"
import { Button, Progress, LabelDatePicker } from "@/components/ui";
import { ChevronLeft } from "lucide-react";

import {Task, BoardContent} from "@/types"

function BoardPage() {
    const {id} = useParams();
    const { toast } = useToast();

    //supabase 'boards' 테이블에서 사용될 각 row의 데이터 column
    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [task, setTask] = useState<Task | null>(null);


    //저장버튼 클릭 시
    const onSave = async () => {
       if (!title || !startDate || !endDate){
        toast({
            variant: "destructive",
            title: "기입되지 않은 데이터(값)가 있습니다.",
            description: "수정한 TODO-LIST의 마감일을 꼭 지켜주세요!",
        });
        return;
       }
       try {
           const { status } = await supabase
               .from("todo")
               .update({
                    title: title,
                    start_date: startDate,
                    end_date: endDate,
                 })
               .eq("id", Number(id));

            if(status === 204){
                toast({
                    title: "TODO-LIST 수정을 완료하였습니다.",
                    description: "수정한 TODO-LIST의 마감일을 꼭 지켜주세요!",
                });
                getData(); // 데이터 갱신
            }
        } catch (error) {
            console.error(error);

       }
    };

    //Add New Board버튼 클릭 시
    const createBoard = () => {
        let newBoards = BoardContent[] = [];
        const boardContent = {
            boardId: nanoid(),
            isChecked: false, //처음엔 완료되지 않으니까 default가 false
            title: "",
            startDate: "",
            endDate: "",
            content: "",
        };

        //supabase에서 해당 데이터가 있을떄 > 값이 있으면, 이미 가지고있는 task를 spread연산자로 뿌리고, 가지고온 보드 출력
        if(task !== null && task.boards.length > 0){
            newBoards = [...task,boards];
            newBoards.push(boardContent);
            updateBoards(newBoards)
        }else if (task !== null && task?.boards.length ===0) {
            //supabase에 데이터가 없을때
            newBoards.push(boardContent);
            updateBoards(newBoards)
        }
    };

    const updateBoards = async (newBoards: BoardContent[]) => {
        try {
            const { status, error } = await supabase.from("todo").update({ boards: newBoards }).eq("id", Number(id));

            if (status === 204) {
                toast({
                    title: "새로운 TODO-BOARD가 생성되었습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
                });
                getData(); // 데이터 갱신
            }

            if (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: "개발자 도구창을 확인하세요.",
                });
            }
        } catch (error) {
            console.log(error);
        }}

         /** Supabase 데이터베이스의(기존에 생성한 페이지에) 데이터 유무 체크 */
    const getData = async () => {
        const { data } = await supabase.from("todo").select("*").eq("id", id);

        console.log(data);
        if (data !== null) {
            setTask(data[0]);
            setTitle(data[0].title);
            setStartDate(data[0].start_date);
            setEndDate(data[0].end_date);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <main className="page__main board">
            {/* 상단 버튼영역 */}
            <div className="board-btn">
                <Button variant={"outline"} size={"icon"}>
                    <ChevronLeft />
                </Button>
                <Button variant={"secondary"} onClick={onSave}>
                    저장
                </Button>
                <AlertPopup><Button className="text-rose-600 bg-red-50 hover:bg-rose-50">삭제</Button></AlertPopup>
            </div>
            <div className="board-header">
                {/* 제목 입력 Input 섹션 */}
                <div className="board-header__input">
                    <input type="text" placeholder="Enter Title Here!" onChange={(event) => setTitle(event.target.value)} // title 상태값 갱신
                        value={title}/>
                </div>
                {/* 진행상황 척도 그래프 섹션 */}
                <div className="board-header__bar">
                    <p>1/10 Completed</p>
                    <Progress className="progress" value={33} />
                </div>
                {/* 캘린더 + Add New Board 버튼 섹션 */}
                <div className="board-header__box">
                    <div className="calendar">
                        <LabelDatePicker label={"From"} propDate={startDate} onSetDate={setStartDate} />
                        <LabelDatePicker label={"To"} propDate={endDate} onSetDate={setEndDate}/>
                    </div>
                    <Button
                        className="button-org full"
                        onClick={createBoard}
                    >
                        Add New Board
                    </Button>
                </div>
            </div>
            <div className="board-body">
                {task?.boards.length === 0 ? (
                        /* Add New Board 버튼 클릭으로 인한 Board 데이터가 없을 경우 */
                <div className="board-body__noData">
                    <h3>There is no board yet.</h3>
                    <p>Click the button and start flashing!</p>
                    <button onClick={createBoard}>
                        <Image
                            src="/assets/images/button.svg"
                            width={74}
                            height={74}
                            alt="rounded-button"
                        />
                    </button>
                </div>
                ):(
                /* Add new board 버튼 클릭으로 인한 board 데이터가 있을 경우 */
                <div className="board-body__isData">
                {task?.boards.map((board: BoardContent) => {
                            return <CardBoard key={board.boardId} data={board} onBoards={setTask} />;
                })}
            </div>
                )}
        </main>
    );
}

export default BoardPage;
