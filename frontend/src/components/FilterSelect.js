import React from 'react';

const FilterSelect = ({ filter, onFilterChange }) => (
    <select onChange={(e) => onFilterChange(e.target.value)} value={filter}>
        <option value=""><i class="fa-solid fa-filter"></i>Filter by</option>
        <option value="likes">Likes</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
    </select>
);

export default FilterSelect;
