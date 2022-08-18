import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Load from '../components/Load';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      favoritesTrack: [],
      loadList: true,
    };
  }

  componentDidMount() {
    this.ifFavoriteTracks();
  }

  ifFavoriteTracks = async () => {
    const favoritesTracks = await getFavoriteSongs();
    const favTracksIds = favoritesTracks.map(({ trackId }) => trackId);
    this.setState({
      favorites: favoritesTracks,
      favoritesTrack: favTracksIds,
      loadList: false,
    });
  }

  ifFavorites = async ({ target: { id, checked } }) => {
    this.setState({ loadList: true }, async () => {
      const { favorites } = this.state;
      const musicObj = favorites.find(({ trackId }) => trackId === parseInt(id, 10));
      if (!checked) {
        await removeSong(musicObj);
        const retrievedList = await getFavoriteSongs();
        const newList = retrievedList.reduce((acc, curr) => {
          if (curr.trackId !== id) acc.push(curr.trackId);
          return acc;
        }, []);

        this.setState({
          favoritesTrack: newList,
          favorites: retrievedList,
          loadList: false,
        });
      }
    });
  }

  toNumbers = (arr) => arr.map(Number);

  render() {
    const { loadList, favorites, favoritesTrack } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {loadList
          ? <Load />
          : (
            favoritesTrack.length && (
              <div className="songs">
                { favorites.map(({ trackName, previewUrl, trackId }) => (
                  <MusicCard
                    key={ parseInt(trackId, 10) }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ parseInt(trackId, 10) }
                    ifFavorites={ this.ifFavorites }
                    favoritesTrack={ this.toNumbers(favoritesTrack) }
                  />
                ))}
              </div>
            )
          )}
      </div>
    );
  }
}

export default Favorites;
