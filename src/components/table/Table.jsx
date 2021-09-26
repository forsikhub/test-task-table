import React,{useState} from 'react';
import classes from './Table.module.css'
export default function Table({ persons, sortCallBack, personInfoCallBack}) {
     const [isAscending, setIsAscending] = useState({
        id:true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        state: true,
    })  
   const sort=(e)=>{
    const target = e.currentTarget.attributes.value.value
    sortCallBack(target, isAscending[target])
    setIsAscending(prevState => ({
        ...prevState,
        [target]: !isAscending[target]
    }))
}
  return (
    <table border="1" className={classes.table}>
      <tr className={classes.Tr}>
        <th value={"id"} onClick={(e)=>sort(e) }>ID {isAscending.id ? <img src="/svg/arrow-down.svg"/> : <img  src="/svg/arrow-up.svg"/>}</th>
        <th value={"firstName"} onClick={(e)=>sort(e)}>First Name {isAscending.firstName ? <img src="/svg/arrow-down.svg"/> : <img  src="/svg/arrow-up.svg"/>}</th>
        <th value={"lastName"} onClick={(e)=>sort(e)}>Last name {isAscending.lastName ? <img src="/svg/arrow-down.svg"/> : <img  src="/svg/arrow-up.svg"/>}</th>
        <th value={"email"} onClick={(e)=>sort(e)}>Email {isAscending.email ? <img src="/svg/arrow-down.svg"/> : <img  src="/svg/arrow-up.svg"/>}</th>
        <th value={"phone"} onClick={(e)=>sort(e)}>Phone {isAscending.phone ? <img src="/svg/arrow-down.svg"/> : <img  src="/svg/arrow-up.svg"/>}</th>
        <th value={"state"} onClick={(e)=>sort(e)}>State {isAscending.state ? <img src="/svg/arrow-down.svg"/> : <img  src="/svg/arrow-up.svg"/>}</th>
      </tr>
      
        {persons.map((person) => (
        <tr key={person.phone} onClick={()=>personInfoCallBack(person.phone)}>
          <td>{person.id}</td>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td>{person.email}</td>
          <td>{person.phone}</td>
          <td>{person.adress.state}</td>
        </tr>
        ))}
      
    </table>
  );
}
