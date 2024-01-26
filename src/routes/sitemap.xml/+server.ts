export async function GET() {
	const xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://calvojp.blog</loc>
        <lastmod>${formatDate(new Date())}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
    </urlset>
  `.trim();

	return new Response(xml, {headers: {'Content-Type': 'application/xml'}});
}

function formatDate(date: Date) {
	const y = date.getFullYear();
	const m = (date.getMonth() + 1).toString().padStart(2, '0');
	const d = date.getDate().toString().padStart(2, '0');

	return `${y}-${m}-${d}`;
}
