import React from 'react';

const Name = ({ newName, newNumber }) => {
    return (
        <div>
            {newName} {newNumber}
            {/* {console.log("this is ", newName)} */}
        </div>
    );
};

export default Name;