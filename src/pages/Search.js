import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../components/Load';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      lastSearch: '',
      search: '',
      loadSearch: false,
      searchState: false,
      searchBtnState: true,
      searchResult: [],
    };
  }

  ifSearchChange = ({ target: { value } }) => {
    const minCharacters = 1;
    if (value.length > minCharacters) {
      this.setState({
        searchBtnState: false,
        search: value,
      });
    } else {
      this.setState({
        searchBtnState: true,
        search: value,
      });
    }
  }

  ifClickSearch = (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      lastSearch: search,
      search: '',
      loadSearch: true,
      searchState: true,
    }, async () => {
      const { lastSearch } = this.state;
      const result = await searchAlbumsAPI(lastSearch);
      this.setState({
        searchResult: result,
        loadSearch: false,
      });
    });
  }

  render() {
    const { searchBtnState, search, lastSearch, loadSearch,
      searchState, searchResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          name="search"
          data-testid="search-artist-input"
          value={ search }
          onChange={ this.ifSearchChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ searchBtnState }
          onClick={ this.ifClickSearch }
        >
          Procurar
        </button>
        {searchState && (
          loadSearch
            ? <Load />
            : (
              <div>
                {searchResult.length === 0
                  ? <p>Nenhum álbum foi encontrado</p>
                  : (
                    <div>
                      <p>
                        {`Resultado de álbuns de: ${lastSearch}`}
                      </p>
                      {searchResult
                        .map(({
                          artistName, collectionId, collectionName, artworkUrl100,
                        }, index) => (
                          <div className="albumArtist" key={ index }>
                            <img
                              src={ artworkUrl100 }
                              alt={ collectionName }
                              className="albumImg"
                            />
                            <br />
                            <Link
                              to={ `/album/${collectionId}` }
                              data-testid={ `link-to-album-${collectionId}` }
                              className="albumLink"
                            >
                              {collectionName}
                              {artistName}
                            </Link>
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            )
        )}
      </div>
    );
  }
}

export default Search;
