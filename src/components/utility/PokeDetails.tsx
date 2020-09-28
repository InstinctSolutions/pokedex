import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useAxios from 'axios-hooks';
import { ENDPOINT } from '../../@utils/config/pokeapi';
import { Avatar, LinearProgress, Link  } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import SecurityIcon from '@material-ui/icons/Security';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ColorizeIcon from '@material-ui/icons/Colorize';
import Shield from '../../assets/icons/shield.svg';
import Attack from '../../assets/icons/swords.svg';
import Speed from '../../assets/icons/stopwatch.svg';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {handlePokemonEncounters, handleValue} from '../../@utils/common';
import DialogComponent from '../common/DialogComponent';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        maxWidth: 345,
        '& .MuiCardActionArea-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    image: {
        width: '50%',
        height: '50%'
    },
    avatar: {
        backgroundColor: red[400],
    },
    stats: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '2px 0'
    }
}));

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 15,
      borderRadius: 5,
      width: '90%'
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

interface PokeProps {
    poke_id: number;
    poke_name: string;
}

const PokeDetails: React.FC<PokeProps> = (props: PokeProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [{ data: genderData, loading: genderLoad }] = useAxios({
        url: `${ENDPOINT}/pokemon/${props.poke_name}/`,
        method: 'GET'
    });

    const [{data: encounterLocationData, loading: encounterLocationLoading}] = useAxios({
        url: `${ENDPOINT}/pokemon/${props.poke_name}/encounters`,
    });

    // const [{data: locationArea, loading:locationLoading}, executeLocationArea] = useAxios({
    //     method: 'GET'
    // }, {
    //     manual: true
    // })

    const [state, setState] = useState<object>({})

    // const getLocation = (areas: Array<string>) => {
    //     areas.map((item, key) => {
    //         executeLocationArea({
    //             url: `${ENDPOINT}/location-area/${item}/`
    //         })
    //     });
    // }

    useEffect(() => {
        if(encounterLocationData) {
            handlePokemonEncounters(encounterLocationData)
            // getLocation(encouterData);
        }
        
    }, [encounterLocationData]);

    // useEffect(() => {
    //     if(locationArea) {
    //         console.log(locationArea);
    //     }
    // }, [locationArea]);

    useEffect(() => {
        if(genderData) {
            setState({
                type: genderData.types[0].type.name,
                healthPoint: genderData.stats[0].base_stat,
                attack: genderData.stats[1].base_stat,
                defense: genderData.stats[2].base_stat,
                specialAttack: genderData.stats[3].base_stat,
                specialDefense: genderData.stats[4].base_stat,
                speed: genderData.stats[5].base_stat,
            })
            // console.log(genderData)
        }
        
    }, [genderData]);

    return (
        <>
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.poke_id}
                    </Avatar>
                }
                title={props.poke_name}
                subheader={genderLoad ? 'Loading ...': (state as any).type}
            />
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={props.poke_name}
                    height="140"
                    image={require(`../../assets/images/${props.poke_id}.png`)}
                    title={props.poke_name}
                    className={classes.image}
                />
                
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    State
                </Typography>    
                <div className={classes.stats}>
                    <FavoriteBorderIcon /> &nbsp;
                    {
                        genderLoad && state ? 
                        'Loading ...': 
                        <BorderLinearProgress variant="determinate" value={handleValue((state as any).healthPoint)} />
                    } &nbsp;
                    {genderLoad && state? 
                        'Loading ...': (state as any).healthPoint}
                </div>
                <div className={classes.stats}>
                    <ColorizeIcon /> &nbsp;
                    {
                        genderLoad && state? 
                        'Loading ...':
                        <BorderLinearProgress variant="determinate" value={handleValue((state as any).attack)} />
                    } &nbsp;
                    {genderLoad && state? 
                        'Loading ...': (state as any).attack}
                </div>
                <div className={classes.stats}>
                    <SecurityIcon /> &nbsp;
                    {   
                        genderLoad && state? 
                        'Loading ...': 
                        <BorderLinearProgress variant="determinate" value={handleValue((state as any).defense)} />
                    } &nbsp;
                    {genderLoad && state? 
                        'Loading ...': (state as any).defense}
                </div>
                <div className={classes.stats}>
                    <img src={Attack} alt={'attack'} style={{width: 22, height: 22}} /> &nbsp;
                    {
                        genderLoad && state? 
                        'Loading ...': 
                        <BorderLinearProgress variant="determinate" value={handleValue((state as any).specialAttack)} />
                    } &nbsp;
                    {genderLoad && state? 
                        'Loading ...': (state as any).specialAttack}
                </div>
                <div className={classes.stats}>
                    <img src={Shield} alt={'shield'} style={{width: 22, height: 22}} /> &nbsp;
                    {
                        genderLoad && state? 
                        'Loading ...': 
                        <BorderLinearProgress variant="determinate" value={handleValue((state as any).specialDefense)} />
                    } &nbsp;
                    {genderLoad && state? 
                        'Loading ...': (state as any).specialDefense}
                </div>
                <div className={classes.stats}>
                    <img src={Speed} alt={'speed'} style={{width: 22, height: 22}} /> &nbsp;
                    {
                        genderLoad && state? 
                        'Loading ...': 
                        <BorderLinearProgress variant="determinate" value={handleValue((state as any).speed)} />
                    } &nbsp;
                    {genderLoad && state? 
                        'Loading ...': (state as any).speed}    
                </div>
                <div className={classes.stats}>
                    <LocationOnIcon /> &nbsp;
                    {
                        encounterLocationLoading ?
                        'Loading ...':   
                        <Link onClick={(e: any) => {setOpen(true); e.persist()  }} style={{cursor: 'pointer'}}>View Locations</Link>
                    }
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
        <DialogComponent open={open} setOpen={setOpen} pokeName={props.poke_name}></DialogComponent>
        </>
    )

}

export default PokeDetails;