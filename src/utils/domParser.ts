export const getParagraphsContentFromDoc = (
  index: number,
  documents: Document[],
) =>
  Array.prototype.map.call(
    documents[index].getElementsByTagName('p'),
    p => p.textContent,
  );

export const getImagesSrcAttributesFromDoc = (
  index: number,
  documents: Document[],
) =>
  Array.prototype.map.call(
    documents[index].getElementsByTagName('img'),
    img => {
      const srcAttribute = img.getAttribute('src');
      return srcAttribute[0] === '/'
        ? 'https:'.concat(srcAttribute)
        : srcAttribute;
    },
  );
