// One place for shop-wide details. Edit these and every page updates.
export const site = {
  name: 'SanDiegoMake',
  tagline: 'Steel medal hangers and maker goods, cut and finished in San Diego.',
  email: 'sandiegomake@gmail.com',
  location: 'San Diego, California',
  links: {
    amazon: 'https://www.amazon.com/dp/B074TJVKVT',
    etsy: 'https://www.etsy.com/shop/SanDiegoMake',
    youtube: '', // e.g. 'https://www.youtube.com/@SanDiegoMake'
    instagram: '',
  },
  // Free form service for the custom/bulk quote form.
  // Create a form at https://formspree.io (or similar) and paste its endpoint here,
  // e.g. 'https://formspree.io/f/abcdwxyz'. Left blank, the form opens an email instead.
  quoteFormEndpoint: '',
};

export const nav = [
  { href: '/products/', label: 'Products' },
  { href: '/custom-orders/', label: 'Custom & Bulk' },
  { href: '/log/', label: 'Build Log' },
  { href: '/about/', label: 'About' },
];

// Product lines. Set `live: false` to show a line as "coming soon".
export const productLines = [
  {
    id: 'medal-hangers',
    name: 'Medal Hangers',
    blurb: 'Powder-coated steel displays for runners, swimmers, gymnasts and every sport in between.',
    live: true,
  },
  {
    id: 'electronics',
    name: 'Electronics',
    blurb: 'Small-batch boards and gadgets, designed and assembled in the shop.',
    live: false,
  },
  {
    id: 'metal-works',
    name: 'Metal Works',
    blurb: 'Signs, brackets and one-off pieces cut from steel and aluminum.',
    live: false,
  },
] as const;
