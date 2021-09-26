import React from 'react'
import classes from './MySelect.module.css'
export default function MySelect({options, defaultValue, value, onChange}) {
    return (
        <select 
            className={classes.MySelect}
            value = {value}
            onChange={event=>onChange(event.target.value)}
        >
            <option disabled value = "">{defaultValue}</option>
            {options.map(option=>
                <option key = {option.state} value = {option.state}>
                    {option.state}
                </option>
                )}
        </select>
    )
}
