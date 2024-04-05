import React, { useState } from 'react';

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Handle form submission (send data to backend)
        console.log(formData);
        // Reset form fields
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p>Leave us your details and we'll get in contact with you as soon as possible!</p>
                <div>
                    <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block font-medium text-gray-700">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm  font-medium rounded-md text-white bg-brightColor hover:bg-hoverColor hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
            <br />
            <br />
            <br />

        </div>
    );
};

export default ContactForm;