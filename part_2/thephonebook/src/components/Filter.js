import React from 'react';

const Filter = ({ showFilter, handleFilter }) => {
    return (
        <div>
            Filter shown with: <input
                value={showFilter}
                onChange={handleFilter}
            />
        </div>
    );
};

export default Filter;