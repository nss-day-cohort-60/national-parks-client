import { useState, useEffect } from "react"

export const BlogFilter = ({ searchSetterFunction, searchTerm, blogs, blogSetterFunction }) => {
    // const [blogs, setBlogs] = useState([{ }])
    const [parks, setParks] = useState([{ }])
    const [parkId, setParkId] = useState(0)
    // const [searchTerm, setSearchTerm] = useState("")

    const parkList = () => {
        return fetch(`http://localhost:8088/parks`)
            .then(res => res.json())
            .then(data => setParks(data))
    }

    const getAllBlogs = () => {
        return fetch(`http://localhost:8088/blogs`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    useEffect(() => {
        parkList()
        getAllBlogs()
    }, []
    )

    useEffect(() => {
        menuHTML()
    }, [parks, blogs])

    const parkFilteredBlogFetcher = (parkId) => {
        return fetch(`http://localhost:8088/blogs?park_id=${parkId}`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    const filterAndSearchBlogs = (parkId) => {
        return fetch(`http://localhost:8088/blogs?park_id=${parkId}&key_word=${searchTerm}`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    const searchBlogs = (parkId) => {
        return fetch(`http://localhost:8088/blogs?key_word=${searchTerm}`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    useEffect(() => {
        if (parkId != 0 & searchTerm !== "" & searchTerm !== " ") {
            filterAndSearchBlogs(parkId)
        }
        else if (parkId == 0 & searchTerm !== "" & searchTerm !== " ") {
            searchBlogs(searchTerm)
        }
    }, [searchTerm, parkId])

    const menuHTML = () => {
        return (
            <section className='blogFilterSearch--container'>
                <div className="filter--container">
                    <label>Filter Blogs by Park: </label>
                    <select className="filter" onChange={(e) => {
                        setParkId(e.target.value)
                        if (searchTerm === " " || searchTerm === "") {
                            e.target.value == 0 ? getAllBlogs() : parkFilteredBlogFetcher(e.target.value)
                        }
                    }
                    }>
                        <option key={`park--0`} value={0}>All Parks</option>
                        {parks.map(park => { return (<option key={`park--${park.id}`} value={park.id}>{park.name}</option>) })}
                    </select>
                </div>
                <div className="search--container">
                    <label>Search Blogs: </label>
                    <input className="search" onChange={ (e) => {searchSetterFunction(e.target.value)} } placeholder="type search terms here"/>
                </div>
            </section>
        )
    }

    return (
        <>
            {menuHTML()}
        </>
    )
}