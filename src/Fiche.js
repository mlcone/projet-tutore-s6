import React, { Component } from 'react';
import axios from "axios";

class Fiche extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            gameName: "",
            games: []
        };
    }

    extractParamsUrl(chaineGET)
    {
        var param = chaineGET.split('=');
        return param[1];
    }

    sendRequest() {
        axios.post(`http://localhost:8000/game/fiche/` + this.extractParamsUrl(this.props.location.search))
            .then(res => {
                const games = res.data;
                this.setState({ games });
            })

    }

    render() {
        return (
            <div>
                <a href="/">Retour</a>

                { this.sendRequest()}
                <h1>Fiche Page {this.extractParamsUrl(this.props.location.search)}</h1>

                { this.state.games.map(game => <h1 key={game.appid}>{game.name}</h1>) }
                { this.state.games.map(game => <p key={game.appid}>Date de sortie: {game.release_date}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Développeur: {game.developer}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Publisher: {game.publisher}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Plateforme: {game.platforms}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Age minimum: {game.required_age}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Categories: {game.categories}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Genres: {game.genres}</p>) }
                { this.state.games.map(game => <p key={game.appid}>Tags utilisateurs: {game.steamspy_tags}</p>) }
            </div>
        );
    }
}

export default Fiche;