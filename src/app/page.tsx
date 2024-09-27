"use client"

import Link from 'next/link';
import { Key, useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

interface Email {
    sender: string;
    subject: string;
    snippet: string;
    body: string;
    orderId: string;
    orderStatus: string;
    trackingNumber: string;
}

const GmailComponent = () => {
    const [emails, setEmails] = useState<Email[]>([]);

    useEffect(() => {
        const fetchEmails = async () => {
            const response = await fetch('/api/gmail'); // Ensure this points to your API route
            const data = await response.json();
            setEmails(data);
        };

        fetchEmails();
    }, []);

    console.log("emails: ", emails);

    return (
        <div className="p-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Gmail Messages</h1>
                <Link
                    className="border rounded-lg bg-blue-500 text-white py-2 px-4"
                    href="/api/auth"
                >
                    Log In
                </Link>
            </div>
            <ul className="space-y-4">
                {emails[0] && emails.map((email: Email, index: Key) => (
                    <li key={index} className="p-4 border rounded-lg shadow-md bg-gray-200 text-black">
                        <p className="font-semibold mb-2"><strong>From:</strong> {email.sender}</p>
                        <p className="font-semibold mb-2"><strong>Subject:</strong> {email.subject}</p>
                        <p className="mb-2"><strong>Snippet:</strong> {email.snippet}</p>
                        <div>
                            <strong>Body:</strong>
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(email.body)
                                }}
                            />
                        </div>
                        <hr className="border-t-4 border-black my-10 w-full" />
                        <h1 className="font-semibold text-xl mb-4">ORDER INFORMATION</h1>
                        <p className="font-semibold mb-2"><strong>Order ID:</strong> {email.orderId}</p>
                        <p className="font-semibold mb-2"><strong>Order Status:</strong> {email.orderStatus}</p>
                        <p className="font-semibold mb-2"><strong>Tracking Number:</strong> {email.trackingNumber}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GmailComponent;
