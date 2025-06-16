import { MuiColorInput } from "mui-color-input";
import React from "react";

export default function ColorPicker({id,value,onChange}){

    const sxStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'var(--input--background)',
      maxWidth: '8rem',
      borderRadius: '0.75rem',
        transition: 'background-color 0.2s ease-in',
      '& input': {
        color: 'var(--primary-content)',
        fontSize: '1.1rem'
      },
      // Remove all borders
      '& fieldset': {
        border: 'none'  // Removes default border
      },
      // Remove hover border
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      },
      '&:hover': {
        backgroundColor: 'var(--input--background--light)', // Hover background
      },
      '&.Mui-focused': {
        backgroundColor: 'var(--input--background--light)', // Keep light when focused
      }
    },
     // Color picker popover styles
    '& .MuiPopover-root': {
      '& .MuiPaper-root': {
        backgroundColor: 'var(--input--background) !important',
        borderRadius: '0.75rem !important',
        boxShadow: 'none !important',
        padding: '12px !important',
        
        // Target the color picker container specifically
        '& .flexbox-fix': {
          backgroundColor: 'var(--input--background) !important',
        },
        
        // Style the input inside the picker
        '& input': {
          backgroundColor: 'var(--input-background-light) !important',
          color: 'var(--primary-content) !important',
        },

        // Hue slider border
        '& .react-colorful__hue': {
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          marginBottom: '8px'
        },
        
        // Saturation area border
        '& .react-colorful__saturation': {
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          marginBottom: '8px'
        },
      },
    },
  }
    return(
        <>
            <MuiColorInput
                inputProps={{ readOnly: true }} 
                format= "hex"
                isAlphaHidden={true}
                value={`#${value}`}
                onChange={(e) => id !== undefined ? onChange(id, e) : onChange(e) } 
                sx={sxStyle}
            />
        </>
    )

}