import React from 'react'
import GameListing from './GameListing';
import ShowScores from './ShowScores'

class ShowBrackets extends React.Component {

    render() {
        console.log("showbrackets")
        console.log(this.props)
        
        const startOver = () => {
            if (window.confirm('Are you sure? This will clear all scores and start a new game.')) {
                this.props.app.resetGame();
                this.props.history.push('/');
            }
        };
        
        return (
            <div className="spaceBelow">
                <ShowScores players={this.props.app.state.players}/>
                <button 
                    onClick={() => this.props.history.push('/current/')}
                    style={{
                        backgroundColor: '#2196F3',
                        color: 'white',
                        padding: '10px 20px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        border: 'none',
                        borderRadius: '3px'
                    }}
                >
                    Current Game
                </button>
                <table className="flightTable">
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td>Facing</td>
                            <td>Server</td>
                            <td>In</td>
                            <td>Opp 1</td>
                            <td>Opp 2</td>
                            <td>Bench</td>
                        </tr>
                    </thead>
                    {this.props.app.state.games.map((game,index) => 
                        <GameListing
                             game={game} 
                             index={index}
                             key={index} 
                             setWinner={this.props.app.winner}
                    />)}
                </table>
                <div style={{marginTop: '40px', paddingBottom: '20px'}}>
                    <button 
                        onClick={() => this.props.app.shareGame()}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            marginRight: '10px',
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}}>
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
                        </svg>
                        Share Game
                    </button>
                    <button 
                        onClick={startOver}
                        style={{
                            backgroundColor: '#ccc',
                            color: '#666',
                            padding: '10px 20px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}}>
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
                        </svg>
                        Start Over
                    </button>
                </div>
            </div>
        )
    }
}

export default ShowBrackets