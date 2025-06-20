import { InputLabel, MenuItem, outlinedInputClasses } from '@mui/material';
import React from 'react';
import { menuClasses } from "@mui/material/Menu";
import Select, { selectClasses } from "@mui/material/Select";

function Dropdown({optionsArray, optionLabelsArray, label, labelId, changeHandler,currentValue, inputName}) {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const SelectProps = {

		[`& .${selectClasses.select}`]: {
			minWidth: "50px",
			background: "var(--input--background)",
			color: "var(--primary-content)",
			borderRadius: ".75rem",
			border: "none",
			padding: "calc((5px + 1.171875vw)/2) calc((5px + 0.78125vw))",
			outline: "none"
		},
		[`& .${outlinedInputClasses.notchedOutline}`]: {
			border: "none"
		},
    // Add these to maintain border radius when focused
    [`&.${selectClasses.focused} .${selectClasses.select}`]: {
        borderRadius: ".75rem",
    },
    [`&.${selectClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderRadius: ".75rem",
    }
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP
            },
        },
        sx: {
          [`& .${menuClasses.list}`]: {
            paddingTop: 0,
            paddingBottom: 0,
            background: "var(--input--background)",
            "& li": {
              paddingTop: ".5rem",
              paddingBottom: ".5rem",
            },
			"& li.Mui-selected": {
               background: 'var(--input--background)'
			}
          },
		  
        },
        
      }

    const optionsElements = optionsArray
    .map((e, idx) => <MenuItem className='dark--option' value={e} key={e}>{optionLabelsArray? optionLabelsArray[idx] : e}</MenuItem>);

    return(
        <>
            {/* {(label && labelId) && <InputLabel id={labelId}>{label}</InputLabel>} */}
            <Select
              labelId={labelId || undefined}
              MenuProps={MenuProps}
              name={inputName}
              value={currentValue}
              onChange={changeHandler}
              sx={SelectProps}
            >
                {optionsElements}
            </Select>
        </>
    )
}

export default Dropdown;