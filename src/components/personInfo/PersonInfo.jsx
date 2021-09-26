import React from 'react'
import classes from './PersonInfo.module.css'
export default function PersonInfo({personInfo}) {
    return (
        <div className = {classes.container}>
                <div>Profile info:</div>
                <div>Selected profile: {personInfo.firstName + ' ' + personInfo.lastName}</div>
                <div>Descripton profile: {personInfo.description}</div>
                <div>Adress: {personInfo?.adress?.streetAddress}</div>
                <div>City: {personInfo?.adress?.city}</div>
                <div>State: {personInfo?.adress?.state}</div>
                <div>Index: {personInfo.description}</div>
        </div>
    )
}
