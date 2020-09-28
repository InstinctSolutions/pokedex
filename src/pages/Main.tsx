import { Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import useAxios from 'axios-hooks';
import { ENDPOINT } from '../@utils/config/pokeapi';
import PokeDetails from '../components/utility/PokeDetails';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
// import { storeData } from '../@utils/common';
import moment from 'moment';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        margin: '25px 0',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'center'
    },
    search: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const Main: React.FC = () => {
    const classes = useStyles();
    const localItem = localStorage.getItem('pokeData');
    // const [firstTime, setFirstTime] = useState<boolean>(false);
    const [generalPokemonData, setGeneralPokemonData] = useState<Array<object>>([])
    

    const [{data: generalData, loading: generalLoad}, execute] = useAxios({
        url: `${ENDPOINT}/pokemon/`,
        method: 'GET'
    }, {
        manual: true
    });

    

    const handleDataLogics = useCallback(
        () => {
            const handleDataLogic = (generalData: any, localItem: any) => {
                const lastSyncDate = localItem ? JSON.parse(localItem).lastSync: null;
                const today = moment();
                const diff = today.diff(lastSyncDate, 'seconds');
                
                if(diff >= 10) {
                    localItem = null;
                    localStorage.removeItem('pokeData');
                }
                
                if(localItem) {
                    console.log('with LocalStorage')
                    const pokeData = JSON.parse(localItem)
                    setGeneralPokemonData((pokeData as any).results)
                } else if(!generalData){
                    console.log('API has not called yet');
                    execute();
                } else {
                    console.log('API has returned a response');
                    setGeneralPokemonData(generalData.results);
                    let localData = {
                        results: generalData.results,
                        lastSync: moment()
                    }
                    localStorage.setItem('pokeData', JSON.stringify(localData));
                }
                
            }
            handleDataLogic(generalData, localItem)
        },
        [generalData, localItem, execute],
    )

    useEffect(() => {
        handleDataLogics();
    }, [handleDataLogics])

    // useEffect(() => {
    //     if(localItem) {
    //         if(diff >= 7) {
    //             console.log('localItem stored more than 7 days')
    //             localStorage.removeItem('pokeData');
    //             execute();
    //         } else {
    //             if(!firstTime) {
    //                 const pokeData = JSON.parse(localItem)
    //                 setGeneralPokemonData((pokeData as any).results)
    //             }
    //         }
    //     }
    // }, [execute, localItem, diff])

    // useEffect(() => {
    //     if(!generalData && !localItem) {
    //         console.log('without localItem but API hasnt returned any response');
    //         execute();
    //         setFirstTime(true);
    //     } else {
    //         if(generalData && !localItem) {
    //             console.log('without localItem but, API has returned a response');
    //             setGeneralPokemonData(generalData.results);
    //             let localData = {
    //                 results: generalData.results,
    //                 lastSync: moment()
    //             }
    //             localStorage.setItem('pokeData', JSON.stringify(localData));
    //         }
    //     }
        
        
    // }, [generalData, execute, localItem]);
    
    // useEffect(() => {
    //     if(pokeData) {
            
    //         setPokeEntries(pokeData.pokemon_entries);
    //     }
    //     return () => {

    //     }
    // }, [pokeData])

    if (generalLoad) return <Loading />

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.header} >
                        <Typography variant={'h3'}>Kanto Pokedex</Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.search}>
                    <Autocomplete
                        
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={generalPokemonData.map((option: any) => option.name)}
                        renderInput={(params) => (
                        <TextField
                            style={{width: '500px'}}
                            {...params}
                            label="Search input"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
            /> 
            </Grid>
            <Grid container >
                {generalPokemonData && (<>
                        {
                            generalPokemonData.map((item, key) => {
                                return <Grid item xs={3} key={key} className={classes.root}>
                                    <PokeDetails poke_id={key + 1} poke_name={(item as any).name} />
                                </Grid>
                            })
                        }
                </>)}
            </Grid>
            {/* <Grid container >
                {pokeEntries && (<>
                        {
                            pokeEntries.map((item, key) => {
                                return <Grid item xs={3} key={key} className={classes.root}>
                                    <PokeDetails poke_id={(item as any).entry_number} poke_name={(item as any).pokemon_species.name} />
                                </Grid>
                            })
                        }
                </>)}
            </Grid> */}

        </>
    )
}

export default Main;