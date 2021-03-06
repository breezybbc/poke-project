import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./Navigation.module.css"

export default function Navigation({ session }) {
    const [isOpen, setIsOpen] = useState(false)
    const user = session.user
    const router = useRouter()

    useEffect(() => setIsOpen(false), [router.pathname])

    return (
            <nav className={styles.navigation}>
            <div className={styles.toggle} onClick={e => setIsOpen(active => !active)}>
                {isOpen ? "✖" : "☰"}
            </div>
            <div className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
                <ul className={styles.ul}>
                    {!user && <li key="login"><Link href="/login">Login</Link></li>}
                    {
                        user && <>
                            <li key="index"><Link href="/">Home</Link></li>
                            <li key="create"><Link href="/create">Create a new Pokémon</Link></li>
                            <li key="pokemons"><Link href="/pokemon">Catch em!</Link></li>
                            <li key="name"><Link href="/profile">{user.email}</Link></li>
                            <li key={user.name}>
                                <a href="#" className={styles.logout} onClick={async (e) => {
                                    session.logout()
                                    setIsOpen(false)
                                    router.push("/")
                                }}>Logout</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}