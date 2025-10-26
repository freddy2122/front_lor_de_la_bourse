import React from 'react';
import { ArrowRight, Briefcase, BarChart, GitMerge, Building } from 'lucide-react';
// Liste des sociétés cotées: GET /api/market/companies (voir CompaniesController::index)
import { fetchCompanies } from '../api/marketService';

const CompaniesList = () => {
  const [q, setQ] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [meta, setMeta] = React.useState({ page: 1, per_page: 20, total: 0, last_page: 1 });

  const load = React.useCallback(async (page = 1) => {
    setLoading(true); setError(null);
    try {
      const res = await fetchCompanies({ q, page, per_page: 20 });
      setItems(res?.data || []);
      setMeta(res?.meta || { page: 1, per_page: 20, total: 0, last_page: 1 });
    } catch (e) {
      setError("Impossible de charger les sociétés.");
    } finally {
      setLoading(false);
    }
  }, [q]);

  React.useEffect(() => { load(1); }, [load]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-brand-blue">Sociétés cotées BRVM</h2>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher (nom, symbole, slug)"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button onClick={() => load(1)} className="px-4 py-2 bg-brand-blue text-white rounded-lg">Rechercher</button>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500">Chargement…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="p-3">Nom</th>
                  <th className="p-3">Symbole</th>
                  <th className="p-3">Secteur</th>
                  <th className="p-3">Pays</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.slug || c.symbol} className="border-b hover:bg-brand-cream">
                    <td className="p-3 font-semibold text-brand-blue">{c.name}</td>
                    <td className="p-3">{c.symbol || '—'}</td>
                    <td className="p-3">{c.sector || '—'}</td>
                    <td className="p-3">{c.country || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button disabled={meta.page <= 1} onClick={() => load(meta.page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Préc.</button>
            <span className="text-sm text-gray-600">Page {meta.page} / {meta.last_page}</span>
            <button disabled={meta.page >= meta.last_page} onClick={() => load(meta.page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Suiv.</button>
          </div>
        </>
      )}
    </div>
  );
};

// Sous-composant pour une carte de service "Corporate"
const CorporateServiceCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
    <div className="flex items-center text-brand-gold mb-3">
      {icon}
      <h3 className="ml-3 text-xl font-bold text-brand-blue">{title}</h3>
    </div>
    <p className="text-gray-600">{children}</p>
  </div>
);

const EntreprisesPage = () => {
  return (
    <div className="bg-brand-cream">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Titre principal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-blue">Solutions de Financement pour les Entreprises</h1>
          <p className="mt-4 text-lg text-gray-700">
            Accélérez votre croissance grâce à nos solutions de financement sur mesure et notre expertise du marché des capitaux de l'UEMOA.
          </p>
        </div>

        {/* Liste des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <CorporateServiceCard icon={<Briefcase size={28} />} title="Introduction en Bourse (IPO)">
            Nous vous accompagnons à chaque étape pour faire de votre entrée sur le marché un succès et accroître votre notoriété.
          </CorporateServiceCard>
          <CorporateServiceCard icon={<BarChart size={28} />} title="Émission d'Obligations">
            Levez des fonds à des conditions compétitives en émettant des titres de créance auprès d'un large public d'investisseurs.
          </CorporateServiceCard>
          <CorporateServiceCard icon={<GitMerge size={28} />} title="Conseil en Fusion-Acquisition">
            Bénéficiez de notre expertise pour vos opérations stratégiques de croissance externe ou de restructuration.
          </CorporateServiceCard>
          <CorporateServiceCard icon={<Building size={28} />} title="Ingénierie Financière">
            Nous structurons des solutions de financement complexes et innovantes adaptées à vos projets de développement.
          </CorporateServiceCard>
        </div>

        {/* Formulaire de contact dédié */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-brand-blue mb-2">Contactez nos Experts</h2>
          <p className="text-center text-gray-600 mb-8">Discutons de vos projets. Un de nos conseillers vous recontactera dans les plus brefs délais.</p>
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Nom de l'entreprise" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="text" placeholder="Votre nom complet" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="email" placeholder="Votre email professionnel" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
              <input type="tel" placeholder="Votre numéro de téléphone" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold" />
            </div>
            <textarea placeholder="Décrivez brièvement votre projet ou votre besoin..." rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"></textarea>
            <div className="text-center">
              <button type="submit" className="inline-flex items-center justify-center bg-brand-blue text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors">
                <span>Envoyer la demande</span>
                <ArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>

        {/* Liste des sociétés cotées (API) */}
        <div className="mt-16">
          <CompaniesList />
        </div>
      </div>
    </div>
  );
};

export default EntreprisesPage;
