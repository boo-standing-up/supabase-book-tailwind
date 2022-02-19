// import { IconLogOut } from "@supabase/ui";
import Image from "next/image";
import logo from "src/public/logo.png";

export const TopImage = () => {
  return (
    <header className="flex gap-4 justify-center py-6 text-gray-600">
   <section className="text-gray-600">
            <div className="container flex flex-col justify-center items-center px-5 mt-24 mx-auto">
              <div className="flex flex-col items-center w-full text-center md:w-2/3">
                <div className="animate-bounce">
                  <Image
                  src={logo}
                  alt="Yukidaruma logo"
                  width={350}
                  height={350}
                
                />
                </div>
                <h1 className="mb-4 text-5xl font-medium text-purple-600 sm:text-4xl">
                  Book Merukari
                </h1>
                <p className="mb-4 leading-relaxed">
                  Book Merukari app このアプリはSupabase-tailwind-Next.jsで作りました。メルカリに出店する家にある本を登録整頓するアプリです。Register a lot of books.
                </p>
                <p className="mt-2 w-full text-sm text-gray-500">
                Welcome to my app.
                </p>   
              </div>
            </div>
          </section>
    </header>
  );
};