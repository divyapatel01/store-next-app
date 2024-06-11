"use client";

import { redirect } from "next/navigation";

export default function HomePage() {
  const user = localStorage.getItem("user");

  if (!user) {
    redirect("/auth");
  }

  if (user) {
    const userData = JSON.parse(user);
    console.log(userData);
    redirect("/products");
  }
}
