import React, { useState, useEffect } from "react";
import Navbar from "../PageNavigation";
import '../../Style/LocationSelector.css';
import { useNavigate } from 'react-router-dom';

export default function PickupHubSelector(props) {
    const homePageData = props.homePageData;
    const [hubsList, setHubsList] = useState([]);
    const [newhubsList, setNewhubsList] = useState(null);  // Initialize to null
    const navigate = useNavigate();

    const pickUpAirportId = sessionStorage.getItem("pickUpAirportId");
    const pickUpCityId = sessionStorage.getItem("pickUpCityId");

    useEffect(() => {
        if (pickUpAirportId) {
            fetch("http://localhost:8080/api/hub/" + pickUpAirportId)
                .then(res => res.json())
                .then((result) => setNewhubsList(result))  // Assuming result is an object
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [pickUpAirportId]);  // Add pickUpAirportId to dependency array

    useEffect(() => {
        if (pickUpCityId) {
            fetch("http://localhost:8080/api/hubs/" + pickUpCityId)
                .then(res => res.json())
                .then((result) => setHubsList(result))
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [pickUpCityId]);  // Add pickUpCityId to dependency array

    const handleHubClick = (location) => {
        sessionStorage.setItem("pickupHubId", location.hubId);
        sessionStorage.setItem("pickupHubName", location.hubName);
        navigate('/DropHubSelector');
    };

    return (
        <section>
            <Navbar />
            <section className="section">
                <div className="location-selector">

                    <h2>Pickup Location Selection</h2>
                    <p>Select a Pick-up hub location.</p>
                    <form>
                        {hubsList.length > 0 && hubsList.map(location => (
                            <div key={location.hubId} className="location-item">
                                <label htmlFor={`location-${location.hubId}`} className="radio-label">
                                    <input
                                        type="radio"
                                        name="selectedLocation"
                                        value={location.hubName}
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
                                        value={newhubsList.hubName}
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
    );
}