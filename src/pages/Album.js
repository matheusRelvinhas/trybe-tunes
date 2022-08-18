import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Load from '../components/Load';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loadList: true,
      trackList: [],
      artist: '',
      album: '',
      favoritesTracks: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getTrackList(id);
    this.ifFavoritesTracks();
  }

  getTrackList = async (id) => {
    const tracks = await getMusics(id);
    const { artistName, collectionName } = tracks[0];
    const allTracks = tracks.filter((_track, index) => index !== 0);
    this.setState({
      loadList: false,
      trackList: allTracks,
      artist: artistName,
      album: collectionName,
    });
  }

  ifCheckFavorites = async ({ target: { id, checked } }) => {
    this.setState({ loadList: true }, async () => {
      const { trackList } = this.state;
      const array = trackList.find(({ trackId }) => trackId === parseInt(id, 10));
      if (checked) {
        await addSong(array);
        this.setState((prevState) => ({
          favoritesTracks: [...prevState.favoritesTracks, array.trackId],
        }));
      } else {
        await removeSong(array);
        const list = await getFavoriteSongs();
        const newList = list.reduce((acc, curr) => {
          if (curr.trackId !== id) acc.push(curr.trackId);
          return acc;
        }, []);
        this.setState({
          favoritesTracks: newList,
        });
      }
      this.setState({ loadList: false });
    });
  }

  ifFavoritesTracks = async () => {
    const favSongs = await getFavoriteSongs();
    const favSongsIds = favSongs.map(({ trackId }) => trackId);
    this.setState({ favoritesTracks: favSongsIds });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { loadList, trackList, artist, album, favoritesTracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p>{id}</p>
        {loadList
          ? <Load />
          : (
            <>
              <div className="album-info">
                <p data-testid="album-name">{album}</p>
                <p data-testid="artist-name">{artist}</p>
              </div>
              <div>
                { trackList.map(({ trackName, previewUrl, trackId }) => (
                  <div key={ trackId }>
                    <p>{trackName}</p>
                    <audio data-testid="audio-component" src={ previewUrl } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                      .
                    </audio>
                    <label htmlFor={ trackId }>
                      <input
                        type="checkbox"
                        name="favoriteTrack"
                        data-testid={ `checkbox-music-${trackId}` }
                        id={ trackId }
                        onChange={ this.ifCheckFavorites }
                        checked={ favoritesTracks.includes(trackId) }
                      />
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
