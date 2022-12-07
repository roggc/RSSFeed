import {useMemo, useState, useEffect, useCallback} from 'react';
import {FeedItem} from 'react-native-rss-parser';
import {DOMParser} from '@xmldom/xmldom';
import {getImagesSrcAttributesFromDoc} from '../utils';
import {Image} from 'react-native';

const getAspectRatio = (uri: string) =>
  new Promise<number>(resolve => {
    Image.getSize(uri, (width, height) => {
      resolve(width / height);
    });
  });

export const useDocuments = (data: FeedItem[]) => {
  const [aspectRatios, setAspectRatios] = useState<number[][]>(
    Array.from({length: data.length}, _ => []),
  );
  const titles = useMemo(() => data.map(d => d.title), [data]);
  const ids = data.map(d => d.id);

  const documents = useMemo(
    () =>
      data.map(d =>
        new DOMParser().parseFromString(
          '<!doctype html><html><body>'
            .concat(d.description)
            .concat('</body></html>'),
          'text/html',
        ),
      ),
    [data],
  );

  const getAspectRatios = useCallback(async () => {
    const computedAspectRatios: number[][] = Array.from(
      {length: documents.length},
      _ => [],
    );
    const images = Array.from({length: documents.length}, (_, i) => i).map(v =>
      getImagesSrcAttributesFromDoc(documents[v]),
    );
    for await (const [i, uris] of images.entries()) {
      for await (const uri of uris) {
        if (uri) {
          const aspectRatio = await getAspectRatio(uri);
          computedAspectRatios[i] = [...computedAspectRatios[i], aspectRatio];
        }
      }
    }
    return computedAspectRatios;
  }, [documents]);

  useEffect(() => {
    getAspectRatios().then(computedAspectRatios => {
      setAspectRatios(computedAspectRatios);
    });
  }, [getAspectRatios]);

  return {aspectRatios, documents, titles, ids};
};
