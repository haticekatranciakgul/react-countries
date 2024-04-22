import React from 'react'
import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Article from '../Article/Article';
import Grid from '@mui/material/Grid';
import Item from '../../utils';
import { InputBase } from "@mui/material";
import './Countries.css'

function Countries() {
    const [countries, setCountries] = useState([])
    const [searchText, setSearchText] = useState("");
    const regions = [
        {
            name: "Europe",
        },
        {
            name: "Asia",
        },
        {
            name: "Africa",
        },
        {
            name: "Oceania",
        },
        {
            name: "Americas",
        },
        {
            name: "Antarctic",
        },
    ];

    useEffect(() => {
        document.title = `Showing All Countries`;
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
            }
        };
        getCountries();
    }, []);

    async function searchCountry() {
        try {
            const res = await fetch(
                `https://restcountries.com/v3.1/name/${searchText}`
            );
            const data = await res.json();
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function filterByRegion(region) {
        try {
            const res = await fetch(
                `https://restcountries.com/v3.1/region/${region}`
            );
            const data = await res.json();
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleSearchCountry(e) {
        e.preventDefault();
        searchCountry();
    }

    function handleFilterByRegion(e) {
        e.preventDefault();
        filterByRegion();
    }

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all")
                const data = await res.json()
                setCountries(data.slice(0, 8))

            } catch (error) {
                console.log(error)

            }
        }
        getCountries();
    }, []);


    return (
        <div>
            <Container maxWidth="lg">
                {!countries ?
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                        textTransform={'uppercase'}
                        fontWeight="bold"
                    >
                        <h1>Loading...</h1>
                    </Box>
                    :
                    <Box>
                        <form onSubmit={handleFilterByRegion}>
                            <select
                                name="filter-by-region"
                                id="filter-by-region"
                                className="selectBox"
                                value={regions.name}
                                onChange={(e) => filterByRegion(e.target.value)}
                            >
                                {regions.map((region, index) => (
                                    <option key={index} value={region.name}>
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                        </form>
                        <form onSubmit={handleSearchCountry}>
                            <InputBase className='searchInput' onChange={(e) => setSearchText(e.target.value)} onSubmit={handleSearchCountry} value={searchText} sx={{ ml: 1, flex: 1 }}
                                type='text' name='search' id='serch' placeholder='Search for a country' required />
                        </form>
                        <Grid container spacing={3}>
                            {countries.map((country, index) =>
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                                    <Item> <Article key={country.name.common} {...country}></Article></Item>
                                </Grid>
                            )}
                        </Grid>
                    </Box>}
            </Container>
        </div>
    )
}

export default Countries
