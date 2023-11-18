import styled from '@emotion/styled';
import { FC } from 'react';
import { Container, GeneralBox, GeneralLabel } from '../styled/components';
import { HelmetHead } from '../components/HelmetHead';
import { TrackRow } from '../components/TrackRow';
import { useQuery } from '@apollo/client';
import { ITrack } from '../interfaces';
import { $QueryTracks } from '../graphql/query';

const Tracks: FC = () => {
  const { loading: isLoading, error, data } = useQuery<{ tracks: ITrack[] }>($QueryTracks);

  const loading = isLoading && <div>Идет загрузка...</div>;
  const errorMessage = error && <div>Произошла ошибка при загрузке объявлений</div>;
  const content = data && data.tracks.map((track) => <TrackRow key={track.id} track={track} />);

  return (
    <>
      <HelmetHead title="Заголовок Главной" descr="Описание Главной" />
      <Wrapper>
        <GeneralBox>
          <GeneralLabel>Треки</GeneralLabel>
          {loading}
          {errorMessage}
          {content}
        </GeneralBox>
      </Wrapper>
      ;
    </>
  );
};

const Wrapper = styled(Container)``;

export default Tracks;
