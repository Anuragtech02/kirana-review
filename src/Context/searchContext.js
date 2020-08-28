import React,{createContext,useState,useEffect} from 'react'

const SearchContext = createContext([]) 

export const SearchContextProvider = ({children}) => {
    const [categories,setCategories] = useState([])

    return (
        <SearchContext.Provider value={{setCategories,categories}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
