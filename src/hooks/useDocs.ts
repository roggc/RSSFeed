import {useMemo, useState, useEffect} from 'react';
import {FeedItem} from 'react-native-rss-parser';
import {DOMParser} from '@xmldom/xmldom';
import {getImagesSrcAttributesFromDoc} from '../utils';
import {Image} from 'react-native';

export const useDocs = (data: FeedItem[]) => {
  const [aspectRatios, setAspectRatios] = useState<number[]>([]);
  const docs = useMemo(
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

  useEffect(() => {
    Array.from({length: docs.length}, (_, i) => i)
      .map(v => getImagesSrcAttributesFromDoc(v, docs)[0])
      .forEach(
        uri =>
          uri &&
          Image.getSize(uri, (width, height) =>
            setAspectRatios(aR => [...aR, width / height]),
          ),
      );
  }, [docs]);

  return {aspectRatios, docs};
};
