import React from 'react';
import style from './Checkbox.module.css';
function Checkbox({isChecked, label, checkHandler, id}) {
  return (
    <div className={style.checkboxContainer}>
        <input
            className={style.checkboxInput}
            type='checkbox'
            id={id}
            name={label}
            checked={isChecked}
            onChange={checkHandler}
        />
        <label>{label}</label>
    </div>
  );
}

export default Checkbox;