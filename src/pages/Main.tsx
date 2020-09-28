import { Button, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import useAxios from 'axios-hooks';
import { ENDPOINT } from '../@utils/config/pokeapi';
import PokeDetails from '../components/utility/PokeDetails';
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
    const [generalPokemonData, setGeneralPokemonData] = useState<Array<object>>([])

    const [{data: generalData, loading: generalLoad}, execute] = useAxios({
        url: `${ENDPOINT}/pokemon/`,
        method: 'GET',
        params: {
            limit: 151
        }
    }, {
        manual: true
    });

    function isNumeric(num: any){
        return !isNaN(num)
    }

    const clearStorage = () => {
        localStorage.removeItem('pokeData');
        window.location.reload();
    }

    const search = (val: string) => {
        if(localItem && val.length !== 0) {
            let searchData = JSON.parse(localItem);
            const specificData = searchData.results.find((element: any, index: any) => {
                let ele;
                if(isNumeric(val)) {
                    if((+val - 1) === index) {
                        ele = element;
                    }
                    
                } else {
                    if(val === element.name) {
                        ele = element;
                    }
                }
                return ele;
            });
            if(specificData) {
                setGeneralPokemonData([specificData])
            } else {
                setGeneralPokemonData([])
            }
            
        } else if(val.length === 0) {
            if(localItem) {
                let searchData = JSON.parse(localItem);
                setGeneralPokemonData(searchData.results);
            }
        }
    }

    const handleDataLogic = useCallback(
        () => {
            const displayData = (generalData: any, localItem: any) => {
                const lastSyncDate = localItem ? JSON.parse(localItem).lastSync: null;
                const today = moment();
                const diff = today.diff(lastSyncDate, 'days');

                if(diff >= 7) {
                    console.log('clear storage');
                    clearStorage();
                }

                if(!generalData && localItem && diff < 7) {
                    console.log('with LocalStorage')
                    const pokeData = JSON.parse(localItem)
                    setGeneralPokemonData((pokeData as any).results)
                } else if(!generalData && !localItem){
                    console.log('API has not called yet');
                    execute();
                }else if (!localItem && generalData){
                    console.log('API has returned a response');
                    setGeneralPokemonData(generalData.results);
                    let localData = {
                        results: generalData.results,
                        lastSync: moment()
                    }
                    localStorage.setItem('pokeData', JSON.stringify(localData));
                }
                
            }
            displayData(generalData, localItem)
        },
        [generalData, localItem, execute],
    )

    useEffect(() => {
        handleDataLogic();
        
    }, [handleDataLogic])

    if (generalLoad) return <Loading />
    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.header} >
                    <Typography variant={'h3'}>Kanto Pokedex</Typography>
                    
                </Grid>     
            </Grid>
            <Grid container className={classes.search}>
                <TextField
                    style={{width: '500px', paddingRight: 20}}
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    InputProps={{type: 'search' }}
                    onKeyUp={(e: any) => {
                        if (e.keyCode === 13) {
                            search(e.target.value);
                        } else if(!e.target.value){
                            search(e.target.value);
                        }
                        e.persist()
                    }}
                />
                <Button size="small" variant="outlined" color="primary" onClick={clearStorage}>Clear LocalStorage</Button>
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
        </>
    )
}

export default Main;