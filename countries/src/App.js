import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Countries from "./Components/Countries/Countries";
import { ColorModeContext, useMode } from "./theme";
import {  CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Pages/Navbar";
import SingleCountry from "./Components/SingleCountry/SingleCountry"


const App =() => {
    const [theme, colorMode] = useMode();
    return <div>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/countries" element={<Countries></Countries>}></Route>
                    <Route path="/:name" element={<SingleCountry></SingleCountry>}></Route>
                   

                </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>

    </div>;
};

export default App;