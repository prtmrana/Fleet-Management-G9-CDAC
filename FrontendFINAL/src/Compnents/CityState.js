import { useState } from "react"; 
import States from "./PickupState"; 
import Cities from "./PickupCity"; 

export default function CityState({homePageData, setHomePageData, isPickup}) {

    
    return (
        <section>
                <td><label for='loc'>Enter State</label></td>
                <td> <States> </States> </td> 
                <td> <Cities ></Cities> </td>
                <td></td>
        </section>
    )

}