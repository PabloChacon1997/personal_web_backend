

export const slugify = (text: string): string  => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]s_/g,'')
    .trim()
    .replace(/\s+/g, '_'); 
}