"use client"

import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

export default function AuthGuard({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/login")
            } else {
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [])

    if (loading) return <p>Checking authentication...</p>

    return <>{children}</>
}
