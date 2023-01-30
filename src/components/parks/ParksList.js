import { useEffect, useState } from "react"
import { Park } from "./Park"
import "./parks.css" 


export const ParkList = () => {
    const [parks, setParks] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/parks`)
            .then( res => res.json() )
            .then( (parksArray) => {
                setParks(parksArray)
            })  
        },
        []
    )

    return <>
        
        <div className="parkslist--container"><h2 className="title">National Parks</h2>

        <article className="parks">
            {
                parks.map(
                    (park) => <Park park={park} />)
            }
        </article>
        </div>
    </>

}