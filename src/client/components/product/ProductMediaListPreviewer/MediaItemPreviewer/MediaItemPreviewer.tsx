import classNames from 'classnames';
import type { FC } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { DeviceType, GetDeviceType } from '../../../foundation/GetDeviceType';
import { Image as FImage } from '../../../foundation/Image';

import * as styles from './MediaItemPreiewer.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);

  const img = new Image();
  img.src = file.filename.replace(/.jpg$/, '.webp');

  return (
    <div className={styles.container()}>
      {type === 'image' && <FImage eager fill src={file.filename.replace(/.jpg$/, '.webp')} />}
      {type === 'video' && (
        <GetDeviceType>
          {({ deviceType }) => (
            <video
              autoPlay
              controls
              muted
              playsInline
              className={classNames(styles.video(), {
                [styles.video__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.video__mobile()]: deviceType === DeviceType.MOBILE,
              })}
              src={file.filename.replace(/.mp4$/, '.webm')}
            />
          )}
        </GetDeviceType>
      )}
    </div>
  );
};
