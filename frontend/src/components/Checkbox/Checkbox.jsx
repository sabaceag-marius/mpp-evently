import React from 'react';
import style from './Checkbox.module.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import { color } from 'chart.js/helpers';
import { pink } from '@mui/material/colors';
function CheckboxInput({inputName, isChecked, label, checkHandler}) {
	
	return (
		<FormControlLabel control={
			<Checkbox
				checked={isChecked}
				onChange={checkHandler}
				name={inputName}
			/>} 
		label={label} />
	);
}

export default CheckboxInput;