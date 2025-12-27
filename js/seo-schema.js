
// Generate SEO schema for pages
class SEOSchema {
    static generateMovieSchema(movie) {
        const rating = movie.ratingCount > 0 ? 
            (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
        
        return {
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": movie.title,
            "description": movie.description,
            "image": movie.poster,
            "genre": movie.genre,
            "datePublished": new Date(movie.timestamp * 1000).getFullYear(),
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": rating,
                "ratingCount": movie.ratingCount
            }
        };
    }
    
    static generateWebsiteSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FreeStream",
            "url": window.location.origin,
            "description": "Watch free movies online in HD quality"
        };
    }
    
    static injectSchema(schema) {
        // Remove existing schema
        const existing = document.querySelector('script[type="application/ld+json"]');
        if (existing) existing.remove();
        
        // Add new schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }
}

// Export for use
window.SEOSchema = SEOSchema;