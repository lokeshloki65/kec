import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Image src="/images/kec-logo.png" alt="KEC Logo" width={80} height={80} className="rounded-full" />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">KEC EVENT HUB</h1>
              <p className="text-sm text-gray-600">Kongu Engineering College</p>
              <p className="text-xs text-gray-500">Est. 1984</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  )
}
