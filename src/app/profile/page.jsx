import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "@/components/navbar/Logout";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-10 min-h-screen">
      {session?.user ? (
        <div className="space-y-2 flex gap-5 items-center">
          <Image
            src={session.user.image}
            alt="Avatar"
            width="100"
            height="100"
            className="w-24 h-24 rounded-full border-2 shadow-lg border-slate-800"
          />
          <div className="">
            <p className="text-2xl font-bold">{session.user.name}</p>
            <p className="mt-1 text-sm">{session.user.email}</p>
            <div className="mt-2">
              <Logout />
            </div>
          </div>
        </div>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}
