import React, {useState, useRef} from "react";
import {sendInquiry} from "../../services/InquiryService";
import Notification from "../../layouts/Notification";

const ContactForm = () => {
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const formRef = useRef(null);
    const [modal, setModal] = useState(null);

    const handleClick = async (event) => {
        event.preventDefault();
        const form = formRef.current;
        const email = form.email.value;
        const phone = form.phone.value;
        const title = form.title.value;
        const body = form.body.value;

       
    
        try{
            await sendInquiry({email, phone, title, body });
            setModal({
                showModal: true,
                modalMessage: "Message sent successfully",
                modalTitle: "Success",
                modalType: "success"
            });
            form.reset();
        }catch(error){
            console.error('Error while sending inquiry', error);
            setModal({
                showModal: true,
                modalMessage: error.response.data.message,
                modalTitle: "Error",
                modalType: "error"
            });
        }
    }

    return(
        <>
            <section className="flex justify-center items-center min-h-screen bg-white">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Contact Us</h2>
                    <p className="font-light text-center text-gray-500  sm:text-xl"> Have thoughts to share on our coffee and tea selections? Interested in bulk orders or details about our products? </p>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">We're here to help.</p>
                    <form ref={formRef} className="space-y-8">
                        <div  className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@cofeebeans.com" required/>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone Number</label>
                                <input type="phone" name="phone" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="+1-234 567-8901" required/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                            <input type="text" id="subject" name="title" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                            <textarea id="message" rows="6" name="body" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleClick} type="button" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-brightColor sm:w-fit hover:bg-[#7c2d12] focus:ring-4 focus:outline-none focus:ring-[#a16207]">Send message</button>
                        </div>
                    </form>
                </div>
            </section>
            {modal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
                    <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.modalTitle}</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">{modal.modalMessage}</p>
                            </div>
                            <div className="items-center px-4 py-3">
                                {
                                    modal.modalType === 'error' ? (
                                        <button
                                            id="error-btn"
                                            onClick={() => setModal(null)}
                                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            OK
                                        </button>
                                    ) : (
                                        <button
                                            id="ok-btn"
                                            onClick={() => setModal(null)}
                                            className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            OK
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default ContactForm;