"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const user = localStorage.getItem("user");
  if (!user) {
    redirect("/auth");
  }

  const userData = JSON.parse(user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <>
      <header className="flex justify-between p-4 gap-4 sticky top-0 bg-white z-20">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Logo />
        </div>
        <div className="flex gap-4 items-center">
          <div className="whitespace-nowrap">
            Hi, {userData.firstName} {userData.lastName}
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main className="p-4">{children}</main>
    </>
  );
}
