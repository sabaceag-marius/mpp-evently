import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react'

function DateInput({id,onChange,value,name}) {

    const slotProps = {
        textField: {
          sx: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '.75rem',
              backgroundColor: 'var(--input--background)',
              color: 'var(--primary-content)',
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': {
              color: 'var(--primary-content)',
            },
          },
        },
        popper: {
          sx: {
            '& .MuiPaper-root': {
              backgroundColor: 'var(--input--background)',
              borderRadius: '.75rem',
              overflow: 'hidden',
            },
          },
        },
        paper: {
          sx: {
            backgroundColor: 'transparent', // Let layout handle the bg
            boxShadow: 'none',
            borderRadius: 0, // Remove double-radius
          },
        },
        layout: {
          sx: {
            backgroundColor: 'var(--input--background)',
            color: 'var(--primary-content)',
            borderRadius: '.75rem',
            overflow: 'hidden',
          },
        },
        day: {
            sx: {
              color: 'var(--primary-content)',
              fontSize: '1rem',
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: 'var(--primary)',
                color: '#fff',
                border: 'none',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                },
              },
              '&.MuiPickersDay-root': {
                border: 'none',
              },
              '&:focus': {
                outline: 'none',
                border: 'none',
              },
              '&.Mui-focusVisible': {
                outline: 'none',
                border: 'none',
              },
            },
          },
        dayOfWeek: {
          sx: {
            color: 'var(--primary-content) !important',
            fontSize: '0.95rem',
            fontWeight: 500,
          },
        },
      };
      
      
      
      

    function changeHandler(e){
        onChange(name,e)
    }

    return(

        <>
            <GlobalStyles
            styles={{
                '.MuiDayCalendar-weekDayLabel': {
                color: 'var(--primary-content) !important',
                fontSize: '0.95rem',
                fontWeight: 500,
                },
            }}
        />
        <DatePicker
            id={id}
            onChange={changeHandler}
            value={value}
            slotProps={slotProps}
        />
        </>

    )

}

export default DateInput;