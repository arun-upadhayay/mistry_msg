"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
      // callbackUrl:'/'
    });
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect username or password",
        variant: "destructive",
      });
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  // tsx implementation code
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {" "}
            Join Mystery Message{" "}
          </h1>
          <p className="mb-4"> Sign in to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* email field */}
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email/username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password field  */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {" "}
              signIn
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default page;
