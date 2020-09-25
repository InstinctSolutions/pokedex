import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import { Avatar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

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
}));

interface PokeProps {
    poke_id: number;
    poke_name: string;
}

const PokeDetails: React.FC<PokeProps> = (props: PokeProps) => {
    const classes = useStyles();

    const [{ data: genderData, loading: genderLoad }] = useAxios({
        url: `${ENDPOINT}/pokemon/${props.poke_id}/`,
        method: 'GET'
    });
    const [state, setState] = useState<object>({})

    useEffect(() => {
        if(genderData) {
            setState({
                type : genderData.types[0].type.name,
    
            })
            console.log(genderData)
        }
        
    }, [genderData]);


    return (
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
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        State
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
            </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
          </Button>
                <Button size="small" color="primary">
                    Learn More
          </Button>
            </CardActions>
        </Card>
    )

}

export default PokeDetails;