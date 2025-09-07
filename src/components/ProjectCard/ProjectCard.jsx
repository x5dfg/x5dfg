import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";

function ProjectCard(props) {
    return (
        <div className={styles.Card}>
            <Link to={props.link_url}>
            <img 
                className={styles.Preview} 
                src={props.prew_url} 
                alt={props.title} 
                onError={function(e) { e.target.src = "/fallback.webp"; }}
            />
            <div className={styles.Details} >
                <div className={styles.IconAndTitle}>
                    <img 
                        className={styles.Icon} 
                        src={props.icon_url} 
                        alt={props.title} 
                        onError={function(e) { e.target.src = "/fallback.webp"; }}
                    />
                    <h2>{props.title}</h2>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default ProjectCard;