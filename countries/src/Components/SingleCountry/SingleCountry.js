import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";
import Item from '../../utils';
import './SingleCountry.css';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


function SingleCountry(population, region, subregion) {
    const [country, setCountry] = useState([]);
    const { name } = useParams();


    useEffect(() => {
        const getSingleCountry = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
                const data = await res.json()
                setCountry(data)

            } catch (error) {
                console.log(error)

            }
        }
        getSingleCountry();
    }, [name]);



    return (
        <section>
            <Container maxWidth="lg">

                <Box>
                    <Grid container spacing={3}>
                        {country.map((item, index) => (
                            <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <Item>
                                    <Grid key={item.name.official} container spacing={2}  padding={5}>
                                        <Grid xs={8}>
                                            <img src={item.flags.svg} alt={item.name.common} className='singleCountryImg'></img>
                                        </Grid>
                                        <Grid xs={4}>
                                            <Typography variant="h2" gutterBottom>
                                                {item.name.official}
                                            </Typography>
                                            <ul>
                                                <li><Typography variant="h4" gutterBottom>Capital: {item.capital[0]}</Typography></li>
                                                <li><Typography variant="h4" gutterBottom>Population: {item.population.toLocaleString()}</Typography></li>
                                                <li><Typography variant="h4" gutterBottom> Region: {item.region}</Typography></li>
                                                <li><Typography variant="h4" gutterBottom>Subregion: {item.subregion}</Typography></li>
                                            </ul>
                                            {item.borders && (
                                                <>
                                                    <h3>Borders:</h3>
                                                    <ul className='flexFlowRow'>
                                                        {item.borders.map((border) => (
                                                            <Item><li >{border}</li></Item>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                            <Box marginTop={5}>
                                            <Link to='/countries' className='link'>&larr; BACK</Link>

                                            </Box>
                                           
                                        </Grid>
                                    </Grid>

                                </Item>
                            </Grid>

                        ))}
                    </Grid>
                </Box>
            </Container>
        </section>
    )
}

export default SingleCountry
