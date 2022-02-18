// import { IconLogOut } from "@supabase/ui";
import Image from "next/image";
import logo from "../public/logo.png";

export const TopImage = () => {
  return (
    <header className="flex gap-4 justify-center py-6 text-gray-600">
   <section className="text-gray-600">
            <div className="container flex flex-col justify-center items-center py-8 px-5 mx-auto">
              <div className="flex flex-col items-center w-full text-center md:w-2/3">
                <Image
                  src={logo}
                  alt="Yukidaruma logo"
                  width={350}
                  height={350}
                />
                <h1 className="mb-4 text-5xl font-medium text-purple-600 sm:text-4xl">
                  Supabase-tailwind
                </h1>
                <p className="mb-8 leading-relaxed">
                  Book kanri app このアプリはSupabase-tailwindアプリはで作りました。たくさんのBookを登録してね(^^)
                  This app was made by Supabase-tailwind app. Register a lot of books.
                </p>
                <p className="mt-2 mb-8 w-full text-sm text-gray-500">
                Welcome to my app.
                </p>   
              </div>
            </div>
          </section>
    </header>
  );
};