import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import useAxios from 'axios-hooks';
import { ENDPOINT } from '../@utils/config/pokeapi';
import PokeDetails from '../components/utility/PokeDetails';


const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        margin: '25px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const Main: React.FC = () => {
    const classes = useStyles();
    const [pokeEntries, setPokeEntries] = useState<Array<object>>([]);
    const [{ data: pokeData, loading: pokeLoad }] = useAxios({
        url: `${ENDPOINT}/pokedex/2/`,
        method: 'GET'
    });

    // const [{data: encounterData}] = useAxios({
    //     url: `${ENDPOINT}/encounter-method/2/`,
    //     method: 'GET'
    // });

    // const getSpeciesDetails = (pokeId: number) => {
    //     speciesExecute({
    //         url: `${ENDPOINT}/stat/1`
    //     });
    // }

    useEffect(() => {
        // setPokeEntries(prev => ({
        //     ...prev,
        //     pokeData.pokemon_entries
        // }));
        
        if(pokeData) {
            // console.log(pokeData.pokemon_entries);
            // console.log(pokeData.pokemon_entries.length);
            // pokeData.pokemon_entries.forEach((element: any) => {
            //     console.log(element.entry_number, element.pokemon_species.name)
            // });
            setPokeEntries(pokeData.pokemon_entries);
        }
        return () => {

        }
    }, [pokeData])

    if (pokeLoad) return <Loading />

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.header} >
                        <Typography variant={'h3'}>Kanto Pokedex</Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.root}>
                {pokeEntries && (<>
                    {
                        pokeEntries.map((item, key) => {
                            return <Grid item xs={3} key={key} className={classes.root}>
                                <PokeDetails poke_id={(item as any).entry_number} poke_name={(item as any).pokemon_species.name} />
                            </Grid>
                        })
                    }
                </>)}
            </Grid>

        </>
    )
}

export default Main;