import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "@/components/ui/toast/toaster";
import { AsideSection } from "@/widgets";
import "./styles/globals.css";
import "./styles/main.scss";

const NOTO_SANS_KR = Noto_Sans_KR({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "NEXT.js TO-DO BOARD",
    description: "Shadcn UI + NEXT.js TO-DO BOARD 만들기",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${NOTO_SANS_KR.className}`}>
                <div className="page">
                    <AsideSection />
                    <main className="page__main">{children}</main>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
