import { useState, useEffect } from "react"

export const BlogFilter = ({ setterFunction }) => {
    const [blogs, setBlogs] = useState([{ }])
    const [parks, setParks] = useState([{ }])
    const [park_id, setParkId] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredBlogFetcher = (park_id) => {
        return fetch(`http://localhost:8088/blogs?park_id=${park_id}`)
            .then(res => res.json())
            .then(data => setBlogs(data))
    }

    const parkList = () => {
        return fetch(`http://localhost:8088/parks`)
            .then(res => res.json())
            .then(data => setParks(data))
    }

    const getAllBlogs = () => {
        return fetch(`http://localhost:8088/blogs`)
            .then(res => res.json())
            .then(data => setBlogs(data))
    }

    useEffect(() => {
        parkList()
        getAllBlogs()
    }, []
    )

    useEffect(() => {
        menuHTML()
    }, [parks, blogs])

    const filterAndSearch = (park_id) => {
        return fetch(`http://localhost:8088/blogs?park_id=${park_id}&key_word=${searchTerm}`)
            .then(res => res.json())
            .then(data => setBlogs(data))
    }

    useEffect(() => {
        if (setParkId !== 0 & searchTerm !== "" & searchTerm !== " ") {
            filterAndSearch(park_id)
        }
        // need a /blogs?key_word="sfefsef" function in server
    }, [searchTerm, park_id])

    const menuHTML = () => {
        return (
            <section className='blogFilterSearch--container'>
                <div className="filter--container">
                    <label>Filter Blogs by Park: </label>
                    <select className="filter" onChange={(e) => {
                        setParkId(e.target.value)
                        if (searchTerm === " " || searchTerm === "") {
                            e.target.value == 0 ? getAllBlogs() : filteredBlogFetcher(e.target.value)
                        }
                    }
                    }>
                        <option key={`park--0`} value={0}>All Parks</option>
                        {parks.map(park => { return (<option key={`park--${park.id}`} value={park.id}>{park.name}</option>) })}
                    </select>
                </div>
                <div className="search--container">
                    <label>Search Blogs: </label>
                    <input className="search" onChange={ (e) => {setterFunction(e.target.value)} } placeholder="type search terms here"/>
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