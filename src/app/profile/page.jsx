import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "@/components/navbar/Logout";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">GitHub Profile</h1>
      {session?.user ? (
        <div className="space-y-2">
          <img
            src={session.user.image}
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <Logout />
        </div>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}
