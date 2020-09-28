import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { ENDPOINT } from '../../@utils/config/pokeapi';
import LocationComponent from './LocationComponent';

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
    
    useEffect(() => {
        if(props.open) {
            if(encounterData) {
                console.log(encounterData)
            }
        }
        
    },[encounterData, props.open])
    return (
        <>
            <Dialog onClose={()=>{props.setOpen(false)}} aria-labelledby="customized-dialog-title" open={props.open}>
            <DialogTitle id="customized-dialog-title">
                Encounter Locations
            </DialogTitle>
            <DialogContent dividers>
                {props.open && encounterData && (<LocationComponent location_area_name={props.open && encounterData ? encounterData: []}/>)}
            </DialogContent>
        </Dialog>
      </>
    )
}

export default DialogComponent