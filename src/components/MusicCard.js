import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId,
      favoritesTrack, ifFavorites } = this.props;
    return (
      <div>
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
            name="favoriteCheckbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ ifFavorites }
            id={ trackId }
            checked={ favoritesTrack.includes(trackId) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  ifFavorites: PropTypes.func.isRequired,
  favoritesTrack: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
