import { Dialog, DialogContent, DialogTitle, List } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React from 'react';
import { ENDPOINT } from '../../@utils/config/pokeapi';
import LocationComponent from './LocationComponent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';

interface DialogProp {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pokeName: string;
}

const DialogComponent: React.FC<DialogProp> = (props: DialogProp) => {

    const [{data: encounterData}] = useAxios({
        url: `${ENDPOINT}/pokemon/${props.pokeName}/encounters`,
        method: 'GET'
    });
    
    return (
        <>
            <Dialog onClose={()=>{props.setOpen(false)}} aria-labelledby="customized-dialog-title" open={props.open}>
            <DialogTitle id="customized-dialog-title">
                Encounter Locations 
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <LocationOnIcon style={{color: 'blue'}} /> in Kanto &nbsp;
                    <CancelIcon style={{color: 'red'}} /> not in Kanto
                </div>
                
            </DialogTitle>
            <DialogContent dividers>
                {(props.open && encounterData) && (
                    encounterData.map((item: string, key: number) => {
                        return <List dense={true} key={key} >
                            <LocationComponent location_area_name={(item as any).location_area.name}/>
                        </List>
                    })
                    
                )}
            </DialogContent>
        </Dialog>
      </>
    )
}

export default DialogComponent