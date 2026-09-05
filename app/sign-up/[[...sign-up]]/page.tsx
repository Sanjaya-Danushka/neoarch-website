import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-28">
      <SignUp />
    </div>
  )
}