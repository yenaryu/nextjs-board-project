"use client";
import { useParams, useRouter } from "next/navigation";
import { Button, SearchBar } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Task } from "@/types";

function AsideSection() {
    const router = useRouter();
    const { id } = useParams();
    const { toast } = useToast();
    const [tasks, setTasks] = useState<Task[]>([]);

    //create add new버튼 클릭 시, 데이터 추가
    const createPage = async () => {
        // supabase의 todo-list 테이블에 row데이터 생성
        const { data, status, error } = await supabase
            .from("todo")
            .insert([
                {
                    title: "",
                    start_date: null,
                    end_date: null,
                    boards: [],
                },
            ])
            .select();

        if (status === 201 && data) {
            // toast ui 띄우기
            toast({
                title: "새로운 todo-list가 생성되었습니다.",
                description: "Supabase 데이터베이스를 참고해보세요",
            });
            router.push(`/board/${data[0].id}`);
        }
        if (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "에러가 발생했습니다.",
                description: "개발자 도구창을 확인하세요.",
            });
        }
    };

    const getData = async () => {
        const { data } = await supabase.from("todo").select("*");
        if (data && data !== null) setTasks(data);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <aside className="page__aside">
            {/* 검색창 UI */}
            <SearchBar placeholder="Search" className="search-bar" />
            {/* ADD NEW P AGE 버튼 UI */}
            <Button className="button-org" onClick={createPage}>
                Add New Page
            </Button>
            {/* TODO 목록 UI */}
            <div className="">
                <p className="user-name">Yena&apos;s TODO-BOARD</p>
                <ul className="todo-group">
                    {tasks.map((task: Task) => {
                        if (task.id === Number(id)) {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <li
                                    className="title-area"
                                    onClick={() =>
                                        router.push(`/board/${task.id}`)
                                    }
                                >
                                    <i></i>
                                    <p>Enter Title Here</p>
                                </li>
                            );
                        } else {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <li
                                    className="title-area else"
                                    onClick={() =>
                                        router.push(`/board/${task.id}`)
                                    }
                                >
                                    <i></i>
                                    <p>Enter Title Here</p>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </aside>
    );
}
export { AsideSection };
