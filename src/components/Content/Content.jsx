import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Content.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";

function Content() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function() {
        axios.get("/content/data/projects.json")
            .then(function(res) {
                setProjects(res.data);
            })
            .catch(function(err) {
                console.error(err);
            })
            .finally(function() {
                setLoading(false);
                console.log(`Projects loading: ${loading.valueOf()}`)
            });
    }, []);

    return (
        <main className={styles.Content}>
            {projects.map(function(p, i) {
                return <ProjectCard key={i} {...p} />;
            })}
        </main>
    );
}

export default Content;
