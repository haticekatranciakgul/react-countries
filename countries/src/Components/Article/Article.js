import React from 'react'
import './Article.css';
import { Link } from 'react-router-dom'

function Article({ flags, name, population, region, subregion }) {
    return (
        <>
            <Link to={`/${name.common}`}>
                <article>
                    <img src={flags.svg} alt=''></img>
                    <h2>{name.common}</h2>
                    <ul>
                        <li>Population: {population.toLocaleString()}</li>
                        <li>Region: {region}</li>
                        <li>Subregion: {subregion}</li>

                    </ul>
                </article>
            </Link>
        </>
    )
}

export default Article
