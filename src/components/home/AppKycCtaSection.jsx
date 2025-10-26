import React from 'react';
import { Smartphone, UserPlus, ShieldCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '../common/Skeleton';

const AppKycCtaSection = ({ loading = false }) => {
  if (loading) {
    return (
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-8 w-72 rounded mb-3" />
              <Skeleton className="h-4 w-96 rounded mb-2" />
              <Skeleton className="h-4 w-80 rounded mb-6" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-44 rounded" />
                <Skeleton className="h-12 w-44 rounded" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Skeleton className="h-64 w-32 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-blue">Ouvrez votre compte et investissez depuis votre mobile</h2>
            <p className="mt-3 text-gray-600 max-w-2xl">Processus KYC rapide et sécurisé. Suivez vos positions et placez vos ordres en quelques clics.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <NavLink to="/ouvrir-un-compte-formulaire" className="inline-flex items-center justify-center bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90">
                <UserPlus size={18} className="mr-2" />
                Commencer le KYC
              </NavLink>
              <NavLink to="/login" className="inline-flex items-center justify-center border border-brand-blue text-brand-blue font-bold py-3 px-6 rounded-lg hover:bg-brand-blue hover:text-white">
                <ShieldCheck size={18} className="mr-2" />
                Accéder à l'espace client
              </NavLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-40 h-72 bg-gray-100 rounded-3xl border relative flex items-center justify-center">
              <Smartphone size={32} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppKycCtaSection;
