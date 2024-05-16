"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
      // router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action={onSubmit} className="w-1/4">
        {error && (
          <span className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error}
          </span>
        )}

        <h1 className="text-indigo-600 font-bold text-4xl mb-4 my-8">
          Ingresar
        </h1>

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Correo:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
          className="p-3 rounded block mb-2 bg-indigo-50 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
          className="p-3 rounded block mb-2 bg-indigo-50 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
        <button className="w-full bg-indigo-500 text-white p-3 rounded-lg mt-2">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
