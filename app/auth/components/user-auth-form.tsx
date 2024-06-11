"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LoginData {
  username: string;
  password: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<LoginData>({
    username: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    axios
      .post("https://dummyjson.com/auth/login", data)
      .then((response: { data: any }) => {
        setIsLoading(false);
        toast({ variant: "default", description: "login success" });
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          toast({
            variant: "destructive",
            description: error.response.data.message,
          });
        } else if (error.request) {
          console.log(error.request);
          toast({ description: "something went wrong" });
        } else {
          console.log("Error", error.message);
          toast({ description: "something went wrong" });
        }
        console.log(error.config);
        setIsLoading(false);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
