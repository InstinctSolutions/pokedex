import { CircularProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { ENDPOINT } from '../../@utils/config/pokeapi';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';

interface LocationProp {
    location_area_name: string
}

const LocationComponent: React.FC<LocationProp> = (props: LocationProp) => {
    const [region, setRegion] = useState<string>('')
    const [{data: locationAreaData }] = useAxios({
        url: `${ENDPOINT}/location-area/${props.location_area_name}`,
        method: 'GET'
    });

    const [{data: locationData, loading: locationLoading}, executeLocation] = useAxios({
        method: 'GET'
    }, 
    {
        manual: true
    }
    );

    useEffect(() => {
        if(locationData) {
            setRegion(locationData.region.name);
        }
    }, [locationData])

    useEffect(() => {
        if(locationAreaData) {
            executeLocation({
                url: `${ENDPOINT}/location/${locationAreaData.location.name}`,
            })
        }

    }, [locationAreaData, executeLocation])

    return (
        <>
            <ListItem>
                <ListItemIcon>
                {region === 'kanto' ? <LocationOnIcon style={{color: 'blue'}} />: <CancelIcon style={{color: 'red'}}/>}
                </ListItemIcon>
                {locationLoading && <CircularProgress color="inherit" />}
                {!locationLoading && <ListItemText>{region === 'kanto' ? props.location_area_name: '-'}</ListItemText>}
            </ListItem>
        </>
    )
}

export default LocationComponent;