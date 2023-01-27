import { BlogFilter } from "./BlogFilter"
import { useState } from "react"
import { Blogs } from "./Blogs"

export const BlogContainer = () => {
    const [ searchTerms, setSearchTerms ] = useState(" ")
    const [ blogs, setBlogs ] = useState([])

    return <>
        <BlogFilter searchSetterFunction={setSearchTerms} searchTerm={searchTerms} blogs={blogs} blogSetterFunction={setBlogs} />
        <Blogs searchTermsState={searchTerms} blogs={blogs}/>
    </>
}  