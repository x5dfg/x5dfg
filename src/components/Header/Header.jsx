import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./Header.module.css";

function Header() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(function() {
        axios.get("https://api.github.com/users/x5dfg")
            .then(function(res) {
                setUser(res.data);
            })
            .catch(function(err) {
                console.error(err);
            });
    }, []);

    function toggleMenu() {
        setOpen(function(prev) { return !prev; });
    }

    useEffect(function() {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) {
        return (
            <header className={styles.Header}>
                <h1 className={styles.Title}>Portfolio</h1>
                <div className={styles.MiniCard}>
                    <span className={styles.Login}>Loading...</span>
                </div>
            </header>
        );
    }

    return (
        <header className={styles.Header}>
            <h1 className={styles.Title}>Portfolio</h1>
            <div className={styles.MiniCard} onClick={toggleMenu} ref={menuRef}>
                <span className={styles.Login}>{user.login}</span>
                <img 
                    className={styles.Avatar}
                    src={user.avatar_url}
                    alt={user.login} 
                    onError={function(e) { e.target.src = "/fallback.webp"; }}
                />
                {open && (
                    <div className={styles.PopupMenu}>
                        {user.html_url && <a href={user.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>}
                        {user.public_repos != null && <a href={user.html_url + "?tab=repositories"} target="_blank" rel="noreferrer">Repositories</a>}
                        {user.gists_url && <a href={user.html_url + "?tab=gists"} target="_blank" rel="noreferrer">Gists</a>}
                        {user.starred_url && <a href={user.html_url + "?tab=stars"} target="_blank" rel="noreferrer">Starred</a>}
                        {user.followers != null && <a href={user.html_url + "?tab=followers"} target="_blank" rel="noreferrer">Followers</a>}
                        {user.following != null && <a href={user.html_url + "?tab=following"} target="_blank" rel="noreferrer">Following</a>}
                        {user.organizations_url && <a href={user.html_url + "?tab=organizations"} target="_blank" rel="noreferrer">Organizations</a>}
                        {user.events_url && <a href={user.html_url + "?tab=activity"} target="_blank" rel="noreferrer">Events</a>}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
