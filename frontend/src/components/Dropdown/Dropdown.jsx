import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { menuClasses } from "@mui/material/Menu";

function Dropdown({optionsArray,label, labelId}) {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    // const MenuProps = {
    //     PaperProps: {
    //     style: {
    //         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    //     },

    //     },
    // };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP
            },
        },
        sx: {
        //   marginBlock: "0.5rem",
          [`& .${menuClasses.list}`]: {
            paddingTop: 0,
            paddingBottom: 0,
            background: "var(--background--middle)",
            "& li": {
              paddingTop: "12px",
              paddingBottom: "12px",
            },
            "& li:hover": {
              background: 'var(--background--selected)',
            }
          },
        },
      }

    const optionsElements = optionsArray
    .map(e => <MenuItem className='dark--option' value={e} key={e}>{e}</MenuItem>);

    return(
        <>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                MenuProps={MenuProps}
            >
                {optionsElements}
            </Select>
        </>
    )
}

export default Dropdown;