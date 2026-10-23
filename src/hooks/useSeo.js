import { useEffect } from 'react';
import { site } from '@/content/site';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Titre et description propres à chaque page. */
export function useSeo(title, description) {
  useEffect(() => {
    const full = title ? `${title} — ${site.brand.name}` : `${site.brand.name} — ${site.brand.tagline}`;
    document.title = full;
    setMeta('property', 'og:title', full);
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }
  }, [title, description]);
}
