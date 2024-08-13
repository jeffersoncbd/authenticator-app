import LoginForm from "./form";

export default function Login() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-6">
      <p className="text-6xl">🔐</p>
      <h1 className="text-2xl font-bold">Authenticator</h1>

      <LoginForm />
    </div>
  )
}
