import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function ProfileMenu() {
  return (
    <div className="flex flex-row">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
