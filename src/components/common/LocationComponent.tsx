import { List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import useAxios from 'axios-hooks';
// import { ENDPOINT } from '../../@utils/config/pokeapi';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    title: {
        backgroundColor: theme.palette.background.paper,
    },
    demo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}))

interface LocationProp {
    location_area_name: Array<string>
}

const LocationComponent: React.FC<LocationProp> = (props: LocationProp) => {
    const classes = useStyles();
    
    const [{data: locationData }, executeLocation] = useAxios({
        
        method: 'GET'
    }, {
        manual: true
    });

    useEffect(() => {
        
    }, [props.location_area_name, executeLocation])

    useEffect(() => {
        
        if(locationData){
            console.log(locationData);
        }

    }, [locationData])

    return (
        <>
          <div className={classes.demo}>
            {props.location_area_name.length === 0 && (<>No Locations</>)}
            {props.location_area_name.length > 0 && (
                <List dense={true}>
                {
                    props.location_area_name.map((item: any, key) => {
                      return <ListItem key={key}>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText>{item.location_area.name}</ListItemText>
                  </ListItem>
                    })
                }
              </List>
            )}
            
          </div>
        </>
    )
}

export default LocationComponent;