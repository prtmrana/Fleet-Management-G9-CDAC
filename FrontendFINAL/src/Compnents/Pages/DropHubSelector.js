import React, { useState, useEffect } from "react";
import Navbar from "../PageNavigation";
import '../../Style/LocationSelector.css';
import { useNavigate } from 'react-router-dom';

export default function DropHubSelector(props) {
    const homePageData = props.homePageData;
    const [hubsList, setHubsList] = useState([]);
    const [newhubsList, setNewhubsList] = useState(null);
    const navigate = useNavigate();

    const dropAirportId = sessionStorage.getItem("dropAirportId");
    const dropCityId = sessionStorage.getItem("dropCityId");

    useEffect(() => {
        if (dropAirportId) {
            fetch("http://localhost:8080/api/hub/" + dropAirportId)
                .then(res => res.json())
                .then((result) => setNewhubsList(result))
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [dropAirportId]);

    useEffect(() => {
        if (dropCityId) {
            fetch("http://localhost:8080/api/hubs/" + dropCityId)
                .then(res => res.json())
                .then((result) => {
                    if (Array.isArray(result)) {
                        setHubsList(result);
                    } else {
                        console.error('Received non-array data:', result);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [dropCityId]);

    const handleHubClick = (location) => {
        sessionStorage.setItem("dropHubId", location.hubId);
        sessionStorage.setItem("dropHubName", location.hubName);
        navigate('/categoryselector');
    };

    return (
        <section>
            <Navbar />
            <section className="section">
                <div className="location-selector">
                    <h2>Drop Location Selection</h2>
                    <p>Select a drop hub location.</p>
                    <form>
                        {hubsList.map(location => (
                            <div key={location.hubId} className="location-item">
                                <label htmlFor={`location-${location.hubId}`} className="radio-label">
                                    <input
                                        type="radio"
                                        name="selectedLocation"
                                        value={location.hubId}
                                        id={`location-${location.hubId}`}
                                        onChange={() => handleHubClick(location)}
                                    />
                                    <span className="location-name">
                                        {location.hubName}
                                    </span>
                                </label>
                                <p className="location-email">{location.address}</p>
                            </div>
                        ))}
                    </form>
                    {newhubsList && (
                        <form>
                            <div className="location-item">
                                <label htmlFor={`location-${newhubsList.hubId}`} className="radio-label">
                                    <input
                                        type="radio"
                                        name="selectedLocation"
                                        value={newhubsList.hubId}
                                        id={`location-${newhubsList.hubId}`}
                                        onChange={() => handleHubClick(newhubsList)}
                                    />
                                    <span className="location-name">
                                        {newhubsList.hubName}
                                    </span>
                                </label>
                                <p className="location-email">{newhubsList.address}</p>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </section>
    )
}