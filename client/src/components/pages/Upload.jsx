import React, { Component } from 'react';
import api from '../../api';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      album: "",
      year: "",
      genre: "",
      tags: [],
      embed_url: "",
      host: 'bc',
      upload_img: null,
      upload_type: "track",
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleFileUpload = e => {
    this.setState({
      embed_url: e.target.files[0]
    })
  }

  handleClick(e) {
    e.preventDefault()
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("artist", this.state.artist);
    formData.append("album", this.state.album);
    formData.append("year", this.state.year);
    formData.append("genre", this.state.genre);
    formData.append("tags", this.state.tags);
    formData.append("embed_url", this.state.embed_url);
    api.upload(formData)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() })
    );
  }

  render() {
    return(
      <div className="pageContent">
        <h2>Add Content</h2>
        <form action="/upload">
          <div className="form-horizontal">
            <div className="form-vertical">

              <div className="form-item">
                <label className="form-label" for="embed_url">Track Image</label> <br/>
                <input className="form-input" id="embed_url" type="file" onChange={(e) => this.handleFileUpload(e)} />
              </div>
              
            </div>

            <div className="form-vertical">
              <div className="form-item">
                <label className="form-label" for="title">Title</label> <br/>
                <input className="form-input" id="title" type="text" value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" for="artist">Artist</label> <br/>
                <input className="form-input" id="artist" type="text" value={this.state.artist} onChange={(e) => this.handleInputChange("artist", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" for="album">Album</label> <br/>
                <input className="form-input" id="album" type="text" value={this.state.album} onChange={(e) => this.handleInputChange("album", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" for="year">Year</label> <br/>
                <input className="form-input" type="number" value={this.state.year} onChange={(e) => this.handleInputChange("year", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" for="genre">Genre</label> <br/>
                <input className="form-input" type="text" value={this.state.genre} onChange={(e) => this.handleInputChange("genre", e)} />
              </div>
            </div>
          </div>

          <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
        </form>
      </div>
    )
  }
}

export default Upload;