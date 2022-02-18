
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export const Header = () => {
  return (

   
   <header className="flex justify-center gap-4 py-6 text-gray-600 bg-gray-300">
<Link href="/">
<a>
<Image src={logo} alt="logo" width={45} height={45} />
</a>
</Link>
<Link href="/">
<a className="text-2xl text-center">
<h1 className="pt-2 m-2">Book Kanri App</h1>
</a>
</Link>
</header>

  );
};