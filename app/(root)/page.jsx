import Navbar from "../../modules/home/components/navbar";
import { Button } from "../../components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <Button>Test</Button>
      <UserButton />
    </div>
  );
}
