import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import contentService from '../api/contentService';
import { Skeleton, SkeletonText } from '../components/common/Skeleton';

const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const data = await contentService.fetchArticleById(articleId);
        if (mounted) setArticle(data);
      } catch (e) {
        if (mounted) setError("Impossible de charger l'article.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [articleId]);

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        {loading ? (
          <>
            <Skeleton className="h-10 w-80 rounded mb-6" />
            <SkeletonText lines={8} />
          </>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <>
            <h1 className="text-4xl font-bold font-display text-brand-blue mb-8">{article?.title}</h1>
            <NavLink to={`/action/${articleId}`} className="font-bold text-brand-gold hover:underline inline-block mb-4">
              Voir la page unifiée
            </NavLink>
            <div
              className="prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: article?.contentHtml || '' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
