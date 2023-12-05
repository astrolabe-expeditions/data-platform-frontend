'use client'


import { useState, useEffect } from 'react'
import StationTable from '@/components/Table/StationTable'

export default function StationSearchbar({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStations, setFilteredStations] = useState([]);
    const [associatedSensors, setAssociatedSensors] = useState([]);

    const handleSearch = event => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
    };

    useEffect(() => {
        if (searchTerm !== '') {
            const filteredData = data.filter(station => {
                const { id, ...rest } = station;
                return Object.values(rest).some(value => {
                    console.log(rest.sensors);
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchTerm);
                    } else if (typeof value === 'object'){
                        console.log(value.sensors);
                    }

                    return false;
                });
            });
            setFilteredStations(filteredData);
        } else {
            setFilteredStations(data);
        }
    }, [searchTerm, data]);

    return (
        <div>
            <form>
                <input className = "search" name = "searchTerm" value = {searchTerm}
                onChange={handleSearch} type="text" required placeholder="Search..."></input>
                <button className = "search-btn">Search</button>

                {(filteredStations && filteredStations.length > 0) && <StationTable data={filteredStations} />}

            </form>
        </div>
    )
  }

  export { StationSearchbar }