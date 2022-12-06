const mapArrayLike = <T, U>(
  array: ArrayLike<T>,
  callback: (value: T, index: number, array: ArrayLike<T>) => U,
  thisArg?: any,
): U[] => Array.prototype.map.call(array, callback, thisArg) as U[];

export const getParagraphsContentFromDoc = (document: Document) =>
  mapArrayLike<HTMLParagraphElement, string | null>(
    document.getElementsByTagName('p'),
    p => p.textContent,
  );

export const getImagesSrcAttributesFromDoc = (document: Document) =>
  mapArrayLike<HTMLImageElement, string | undefined>(
    document.getElementsByTagName('img'),
    img => {
      const srcAttribute = img.getAttribute('src');
      if (srcAttribute) {
        return srcAttribute[0] === '/'
          ? 'https:'.concat(srcAttribute)
          : srcAttribute;
      }
    },
  );
