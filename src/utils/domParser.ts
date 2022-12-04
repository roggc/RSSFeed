const mapArrayLike = <T, U>(
  array: ArrayLike<T>,
  callback: (value: T, index: number, array: ArrayLike<T>) => U,
  thisArg?: any,
): U[] => Array.prototype.map.call(array, callback, thisArg) as U[];

export const getParagraphsContentFromDoc = (
  index: number,
  documents: Document[],
) =>
  mapArrayLike<HTMLParagraphElement, string | null>(
    documents[index].getElementsByTagName('p'),
    p => p.textContent,
  );

export const getImagesSrcAttributesFromDoc = (
  index: number,
  documents: Document[],
) =>
  mapArrayLike<HTMLImageElement, string | undefined>(
    documents[index].getElementsByTagName('img'),
    img => {
      const srcAttribute = img.getAttribute('src');
      if (srcAttribute) {
        return srcAttribute[0] === '/'
          ? 'https:'.concat(srcAttribute)
          : srcAttribute;
      }
    },
  );
