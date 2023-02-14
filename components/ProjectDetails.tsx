import React from "react";
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'

type Props = {
    route: string, 
    title: string, 
    description: string,
    techStack: string
}

export default function ProductDetails({route, title, description, techStack} : Props) {
    const router = useRouter()
    
    function navigate() {
        router.push(route);
    }

    return (
        <a className={styles.card}
           target="_blank"
           rel="noopener noreferrer"
           onClick={navigate} >
            <h2> { title } </h2>
            <p> {description} </p>
            <p> {techStack} </p>
        </a>
    )
}