"use client";

import ContactIntro from "@/components/contact/ContactIntro";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactMap from "@/components/contact/ContactMap";

export default function Contact() {
    return (
        <main>
            <ContactIntro />
            <ContactForm />
            <ContactFAQ />
            <ContactMap />
        </main>
    )
}