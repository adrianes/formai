import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { countries } from "./countries";

const QuoteForm = ({ data }) => {
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (field, e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [name]: value,
            },
        }));
    };

    const handleDateChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            pickupDateTime: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Pickup From */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Pickup From:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.pickupFrom.address}
                            onChange={(e) => handleAddressChange("pickupFrom", e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.pickupFrom.city}
                            onChange={(e) => handleAddressChange("pickupFrom", e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={formData.pickupFrom.state}
                            onChange={(e) => handleAddressChange("pickupFrom", e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Country</InputLabel>
                            <Select
                                name="country"
                                value={formData.pickupFrom.country}
                                onChange={(e) => handleAddressChange("pickupFrom", e)}
                            >
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Additional Fields */}
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Pickup Date and Time"
                                value={formData.pickupDateTime}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>                    
                    {/* Delivery To */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Delivery To:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.deliveryTo.address}
                            onChange={(e) => handleAddressChange("deliveryTo", e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.deliveryTo.city}
                            onChange={(e) => handleAddressChange("deliveryTo", e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={formData.deliveryTo.state}
                            onChange={(e) => handleAddressChange("deliveryTo", e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Country</InputLabel>
                            <Select
                                name="country"
                                value={formData.deliveryTo.country}
                                onChange={(e) => handleAddressChange("deliveryTo", e)}
                            >
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Additional Fields */}
                    <Grid item xs={12} sm={12}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Product Value"
                            name="productValue"
                            type="number"
                            value={formData.productValue}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Contains Hazardous Materials</InputLabel>
                            <Select
                                name="containsHazardousMaterials"
                                value={formData.containsHazardousMaterials}
                                onChange={handleChange}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Team Service</InputLabel>
                            <Select
                                name="teamService"
                                value={formData.teamService}
                                onChange={handleChange}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
    );
};

export default QuoteForm;              
