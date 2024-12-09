"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

function Initpage() {
    const router = useRouter();
    const { toast } = useToast();

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
    return (
        <main className="page__main init">
            <div className="intro-group">
                <p> How to start:</p>
                <div>
                    <p className="desc">1. Create a page</p>
                    <p className="desc">2. Add boards to page</p>
                </div>
                <Button className="button-org" onClick={createPage}>
                    Add New Page
                </Button>
            </div>
        </main>
    );
}

export default Initpage;
