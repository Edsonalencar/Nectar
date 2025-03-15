import { LoginForm } from "@/components/organisms/LoginForm";
import { Image } from "antd";

export const LoginPage = () => {
  return (
    <>
      <div className="h-screen flex">
        <div className="absolute top-0 left-0">
          <Image
            preview={false}
            src="/esquerda.png"
            className=" absolute left-7- top-0"
            height={300}
            width={300}
          />
        </div>
        <div className="flex flex-col justify-center items-center my-auto mx-auto p-6 xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-2/3  ">
          <Image preview={false} src="/logo.png" width={250} />
          <h1 className="font-bold text-3xl">Bem vindo(a) de volta!</h1>
          <LoginForm />
        </div>
        <div className="absolute bottom-0 right-0">
          <Image
            preview={false}
            src="/direita.png"
            className="rotate-"
            height={300}
            width={300}
          />
        </div>
      </div>
    </>
  );
};
