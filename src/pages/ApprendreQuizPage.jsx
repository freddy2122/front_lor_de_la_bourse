import React from 'react';
import { NavLink } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    question: "Quel est l'objectif principal de la BRVM ?",
    choices: [
      "Financer les projets de l'État uniquement",
      "Permettre la négociation de valeurs mobilières pour les pays de l'UEMOA",
      "Fixer les taux de change entre les monnaies africaines",
    ],
    answerIndex: 1,
  },
  {
    id: 2,
    question: "Que représente une action ?",
    choices: [
      "Un prêt accordé par l'entreprise à l'investisseur",
      "Une part de propriété dans l'entreprise",
      "Un simple ticket de participation à l'Assemblée Générale",
    ],
    answerIndex: 1,
  },
];

const ApprendreQuizPage = () => {
  return (
    <div className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <div className="text-sm text-gray-500 mb-2">
          <NavLink to="/" className="hover:underline">Accueil</NavLink>
          <span className="mx-2">/</span>
          <span>Apprendre</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Quiz</span>
        </div>

        {/* Titre & intro */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-brand-blue mb-3">
          Mini-quiz boursier (version pédagogique)
        </h1>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Quelques questions pour vérifier tes premières notions sur la bourse et la BRVM. Cette
          version est purement statique : les réponses ne sont pas corrigées automatiquement dans
          l&apos;interface, mais les bonnes réponses sont indiquées pour révision.
        </p>

        <div className="space-y-6">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="bg-white border border-gray-100 rounded-lg p-4 md:p-5">
              <p className="text-sm md:text-base font-semibold text-brand-blue mb-3">
                {q.id}. {q.question}
              </p>
              <ul className="space-y-1 text-sm text-gray-800 mb-2">
                {q.choices.map((choice, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{choice}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-green-700">
                Bonne réponse : {q.choices[q.answerIndex]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprendreQuizPage;
