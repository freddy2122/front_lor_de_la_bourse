import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Nous Contacter</h1>
        <p className="mt-4 text-lg text-gray-700">Notre équipe est à votre disposition pour toute question.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Formulaire de contact */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-brand-blue">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
              <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows="4" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
              Envoyer
            </button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin size={24} className="text-brand-gold mt-1" />
            <div>
              <h3 className="text-xl font-bold text-brand-blue">Notre Siège</h3>
              <p className="text-gray-600">123, Avenue de la Finance, Abidjan, Côte d'Ivoire</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Phone size={24} className="text-brand-gold mt-1" />
            <div>
              <h3 className="text-xl font-bold text-brand-blue">Téléphone</h3>
              <p className="text-gray-600">+225 01 02 03 04 05</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Mail size={24} className="text-brand-gold mt-1" />
            <div>
              <h3 className="text-xl font-bold text-brand-blue">Email</h3>
              <p className="text-gray-600">contact@lordelabourse.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
