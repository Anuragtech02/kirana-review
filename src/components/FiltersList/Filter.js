import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    minHeight: "25vh",
    maxHeight: "65vh",
    borderRadius: "10px",
    overflowY: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function FilterList(props) {
  const CategoryFilter = [
    { value: "Category 1", name: "Category_1" },
    { value: "Category 2", name: "Category_2" },
    { value: "Category 3", name: "Category_3" },
    { value: "Category 4", name: "Category_4" },
    { value: "Category 5", name: "Category_5" },
  ];
  const OfferFilter = [
    { value: "Offer 1", name: "Offer_1" },
    { value: "Offer 2", name: "Offer_2" },
    { value: "Offer 3", name: "Offer_3" },
    { value: "Offer 4", name: "Offer_4" },
    { value: "Offer 5", name: "Offer_5" },
  ];
  const BrandFilter = [
    { value: "Brand 1", name: "Brand_1" },
    { value: "Brand 2", name: "Brand_2" },
    { value: "Brand 3", name: "Brand_3" },
    { value: "Brand 4", name: "Brand_4" },
    { value: "Brand 5", name: "Brand_5" },
  ];
  const CustomerFilter = [
    { value: 1, name: "Customer_1" },
    { value: 3, name: "Customer_2" },
    { value: 3, name: "Customer_3" },
    { value: 4, name: "Customer_4" },
    { value: 5, name: "Customer_5" },
  ];
  const KRFilter = [
    { value: 1, name: "KR_1" },
    { value: 3, name: "KR_2" },
    { value: 3, name: "KR_3" },
    { value: 4, name: "KR_4" },
    { value: 5, name: "KR_5" },
  ];

  const handleChange = (event) => {
    if (state.includes(event.target.name)) {
      const array = [...state];
      const index = array.indexOf(event.target.name);
      array.splice(index, 1);
      setState(array);
    } else {
      const State = [...state, event.target.name];
      setState(State);
    }
  };

  const classes = useStyles();
  const [state, setState] = React.useState([]);
  const [Offersopen, setOffersOpen] = React.useState(false);
  const [Brandsopen, setBrandsOpen] = React.useState(false);
  const [KRRatingsopen, setKRRatingsOpen] = React.useState(false);
  const [CustomerRatingsopen, setCustomerRatingsOpen] = React.useState(false);
  const [Categoryopen, setCategoryOpen] = React.useState(false);

  const handleOffersClick = () => {
    setOffersOpen(!Offersopen);
  };
  const handleBrandsClick = () => {
    setBrandsOpen(!Brandsopen);
  };
  const handleKRRatingsClick = () => {
    setKRRatingsOpen(!KRRatingsopen);
  };
  const handle_CustomerRatings_Click = () => {
    setCustomerRatingsOpen(!CustomerRatingsopen);
  };
  const handle_Category_Click = () => {
    setCategoryOpen(!Categoryopen);
  };
  var time = 0;
  props.getState(state);
  console.log("Filter State", state, ++time);
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handle_Category_Click}>
        <ListItemText primary="Category" />
        {Categoryopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={Categoryopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {CategoryFilter.map((filter) => {
            return (
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.includes(filter.name)}
                      onChange={handleChange}
                      name={filter.name}
                      color="primary"
                    />
                  }
                  label={filter.value}
                  label={filter.value}
                />
                {/* <ListItemText primary={filter.value} /> */}
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      <ListItem button onClick={handle_CustomerRatings_Click}>
        <ListItemText primary="Customer Ratings" />
        {CustomerRatingsopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={CustomerRatingsopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {CustomerFilter.map((filter) => {
            return (
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.includes(filter.name)}
                      onChange={handleChange}
                      name={filter.name}
                      color="primary"
                    />
                  }
                />
                <ListItemText>
                  <Rating
                    name="read-only"
                    value={filter.value}
                    size="small"
                    readOnly
                  />
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      <ListItem button onClick={handleKRRatingsClick}>
        <ListItemText primary="KR Ratings" />
        {KRRatingsopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={KRRatingsopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {KRFilter.map((filter) => {
            return (
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.includes(filter.name)}
                      onChange={handleChange}
                      name={filter.name}
                      color="primary"
                    />
                  }
                />
                <ListItemText>
                  <Rating
                    name="read-only"
                    value={filter.value}
                    size="small"
                    readOnly
                  />
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      <ListItem button onClick={handleBrandsClick}>
        <ListItemText primary="Brands" />
        {Brandsopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={Brandsopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {BrandFilter.map((filter) => {
            return (
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.includes(filter.name)}
                      onChange={handleChange}
                      name={filter.name}
                      color="primary"
                    />
                  }
                  label={filter.value}
                />
                {/* <ListItemText primary={filter.value} /> */}
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      <ListItem button onClick={handleOffersClick}>
        <ListItemText primary="Offers" />
        {Offersopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={Offersopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {OfferFilter.map((filter) => {
            return (
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.includes(filter.name)}
                      onChange={handleChange}
                      name={filter.name}
                      color="primary"
                    />
                  }
                  label={filter.value}
                />
                {/* <ListItemText primary={filter.value} /> */}
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
