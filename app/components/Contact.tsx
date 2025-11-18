'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. We will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-40 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-muted-foreground">Get In Touch</p>
          <h2 className="text-5xl md:text-6xl font-light mb-8">Investment Inquiry</h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Connect with us to learn more about this development opportunity
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-4 text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-border focus:border-primary-foreground focus:outline-none transition text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-4 text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-border focus:border-primary-foreground focus:outline-none transition text-lg"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="company" className="block text-xs uppercase tracking-widest mb-4 text-muted-foreground">
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-0 py-4 bg-transparent border-b border-border focus:border-primary-foreground focus:outline-none transition text-lg"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-4 text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-0 py-4 bg-transparent border-b border-border focus:border-primary-foreground focus:outline-none resize-none text-lg"
            />
          </div>
          
          <div className="text-center pt-12">
            <button
              type="submit"
              className="px-16 py-5 bg-primary-foreground text-primary text-sm uppercase tracking-widest hover:bg-secondary transition"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
