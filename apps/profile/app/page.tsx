import { Button } from "@repo/ui/button";

export default function ProfilePage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <h1 className="text-6xl font-bold mb-4">Your Profile</h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your Apple ID and preferences
        </p>
        <Button>Sign In</Button>
      </main>
    </>
  );
}