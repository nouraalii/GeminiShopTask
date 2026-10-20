export function getProductImage(product: { name: string; category?: string }): string {
  const text = (product.name + ' ' + (product.category || '')).toLowerCase();

  if (text.includes('earbud') || text.includes('airpod') || text.includes('pro')) {
    return '/images/product-earbuds.jpg';
  }
  if (
    text.includes('phone') ||
    text.includes('galaxy') ||
    text.includes('iphone') ||
    text.includes('pixel')
  ) {
    return '/images/product-phone.jpg';
  }
  if (
    text.includes('macbook') ||
    text.includes('laptop') ||
    text.includes('thinkpad') ||
    text.includes('dell') ||
    text.includes('notebook')
  ) {
    return '/images/product-laptop.jpg';
  }

  // Default to premium headphones
  return '/images/product-headphones.jpg';
}
