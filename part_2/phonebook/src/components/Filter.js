import React from 'react';

const Filter = ({ persons, newFilter, setNewfilter }) => {
    const handleFilterContact = (event) => {
        event.preventDefault()
        // alert('A name was submitted: ', event.target.value);
        // const contact = persons.filter(person => person.name.toLowerCase() === event.target.value.toLowerCase())
        // if (contact.length !== 0) {
        //     alert('Found! \n', contact[0]["name"]);
        //     console.log(contact[0]["name"], contact[0]["number"])
        // }
        const contact = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        console.log(contact)
    }

    return (
        <div>
            <div >Filter shown with: <input
                type="text"
                onChange={handleFilterContact}
            />
            </div>
        </div>
    );
};

export default Filter;