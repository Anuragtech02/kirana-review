import React from 'react'
import styles from './Category.module.css'
import { 
    List,
    ListSubheader,
    ListItemText,
    ListItem,
    Collapse,
    Badge
} from '@material-ui/core'
import { 
    ExpandLess, 
    ExpandMore 
} from '@material-ui/icons'




export const Category = () =>{

        const categoryListItems = [
        {
            categoryName: "Beverages",
            subcategories : [
                {
                    name: "coffee/tea",
                    url: "#"
                }, 
                {
                    name: "juice" , 
                    url: "#"
                },
                {
                    name: "soda",
                    url: "#"
                },
            ],
            url: "#",
        },
        {
            categoryName: "Bread/Bakery",
            subcategories : [
                {
                    name: "sandwich loaves",
                    url: "#"
                }, 
                {
                    name: "dinner rolls" , 
                    url: "#"
                },
                {
                    name: "tortillas",
                    url: "#"
                },
                {
                    name: "bagels",
                    url: "#"
                },
            ],
            url: "#",
        },
        {
            categoryName: "Dairy",
            subcategories: [],
            url: "#"
        },
        {
            categoryName: "Dry/Baking Goods",
            subcategories : [
                {
                    name: "cereals",
                    url: "#"
                }, 
                {
                    name: "flour" , 
                    url: "#"
                },
                {
                    name: "sugar",
                    url: "#"
                },
                {
                    name: "pasta",
                    url: "#"
                },
                {
                    name: "mixes",
                    url: "#"
                },
            ],
            url: "#",
        },
        {
            categoryName: "Produce ",
            subcategories : [
                {
                    name: "fruits",
                    url: "#"
                }, 
                {
                    name: "vegetables" , 
                    url: "#"
                },
            ],
            url: "#",
        },
    ]

    return(
        <div className={styles.categoryContainer}>
            <List
                className={styles.list}
                component="nav" 
                aria-label="main-category-lists"
                aria-labelledby="main-category-subheader"
                subheader={
                    <ListSubheader component="div" className={styles.subheader} id="main-category-subheader">
                        Categories
                    </ListSubheader>
                }
            >
                {categoryListItems.map((category) => {
                    return(
                        <CategoryList category={category} />
                    )
                })}
            </List>
        </div>
    )

}

export const CategoryList = ({category}) => {

    const [open, setOpen] = React.useState(false)

    const categoryClick = () => {
        setOpen(!open)
    };

    const subcategoryClick = () => {
        console.log("Subcategory clicked");
    };

    return(
        <>
            <ListItem button onClick={categoryClick}>
                <ListItemText primary={category.categoryName}/>
                {category.subcategories.length>0 && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {category.subcategories.map((subcategory) => {  
                return(
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button onClick={subcategoryClick} className={styles.nested}>
                                <ListItemText secondary={subcategory.name}/>
                            </ListItem>
                        </List>
                    </Collapse>
                ) 
            })}
        </>
    )
}

export default Category