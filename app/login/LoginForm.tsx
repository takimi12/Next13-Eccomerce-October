"use client";

import { AiOutlineGoogle } from "react-icons/ai";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";




const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);


  };



  return (
    <>
      <Heading title="Sign in to E~Shop" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() =>{} }
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="email"
      ></Input>
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      ></Input>
      <Button
        label={isLoading ? "Loading..." : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account?{" "}
        <Link className="underline" href="/register">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
