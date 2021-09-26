import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PersonsService from './API/PersonsService';
import Table from './components/table/Table';
import MySelect from './components/UI/MySelect';
import MyInput from './components/UI/MyInput';
import PersonInfo from './components/personInfo/PersonInfo';
import { useFetching } from './hooks/useFetching';
import MyLoader from './components/UI/MyLoader';
function App() {
  const [persons, setPersons] = useState([]);
  const [personInfo, setPersonInfo] = useState([]);
  const [selectedState, setSelectedState] = useState('all states');
  const [searchByName, setSearchByName] = useState('');
  const [fetchPersons, isPostLoading, personError] = useFetching(async () => {
    const persons = await PersonsService.getAllPersons();
    setPersons(persons);
  });

  useEffect(() => {
    fetchPersons();
  }, []);
  const sortPersons = (event, sortIsAscending) => {
    if (event === 'state') {
      sortIsAscending
        ? setPersons(
            [...persons].sort((a, b) => a['adress'][event].localeCompare(b['adress'][event])),
          )
        : setPersons(
            [...persons].sort((a, b) => b['adress'][event].localeCompare(a['adress'][event])),
          );
    } else if (event === 'id') {
      sortIsAscending
        ? setPersons([...persons].sort((a, b) => a[event] - b[event]))
        : setPersons([...persons].sort((a, b) => b[event] - a[event]));
    } else {
      sortIsAscending
        ? setPersons([...persons].sort((a, b) => a[event].localeCompare(b[event])))
        : setPersons([...persons].sort((a, b) => b[event].localeCompare(a[event])));
    }
  };
  //////
  const getPersonInfo = (phone) => {
    persons.forEach((person) => {
      if (person.phone === phone) {
        setPersonInfo(person);
        console.log(personInfo);
      }
    });
  };

  //////

  const filterByStateAndName = useMemo(() => {
    if (selectedState === 'all states')
      return persons.filter((person) =>
        person['firstName'].toLowerCase().includes(searchByName.toLowerCase()),
      );

    return persons.filter(
      (person) =>
        person['adress']['state'] === selectedState &&
        person['firstName'].toLowerCase().includes(searchByName.toLowerCase()),
    );
  }, [persons, selectedState, searchByName]);

  return (
    <div className="App">
      <div className="container">
        <div className="container__utils">
          <div>
            <MyInput
              value={searchByName}
              placeholder={'Search by name:'}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
          <div>{personInfo.length !== 0 ? <PersonInfo personInfo={personInfo} /> : ''}</div>
          <div>
            <MySelect
              value={selectedState}
              onChange={(state) => setSelectedState(state)}
              defaultValue="Filter by state"
              options={[
                { state: 'all states' },
                { state: 'WI' },
                { state: 'TN' },
                { state: 'FL' },
                { state: 'NE' },
              ]}
            />
          </div>
        </div>
        <div>
          {personError && <div>Ошибка {personError}</div>}

          {!isPostLoading ? (
            <Table
              sortCallBack={sortPersons}
              personInfoCallBack={getPersonInfo}
              persons={filterByStateAndName}
            />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <MyLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
