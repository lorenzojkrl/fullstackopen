import React from 'react';

const ShowButton = ({ name }) => {
    return (
        <div>
            {name}
            <button
                onCLick="handleClickShow" >
                show
            </button>

        </div>
    );
};

export default ShowButton;