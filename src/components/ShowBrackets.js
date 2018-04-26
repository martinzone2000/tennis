import React from 'react'
import FlightListing from './FlightListing'

class ShowBrackets extends React.Component {
    render() {
        console.log("showbrackets")
        console.log(this.props)
        return (
            <div>
                {/* <p>{this.props.flights.length}</p>
                <ul>
                {this.props.flights.map((flight,index) => 
                        <FlightListing
                             games={flight} 
                             flightNum={index}
                             key={index} 
                    />)}
                </ul> */}
                <table>
                    <tr>
                        <th>Server</th>
                        <th>Server Team Mate</th>
                        <th>OOS 1</th>
                        <th>OOS 2</th>
                        <th>Bench</th>
                    </tr>
                    {this.props.flights.map((flight,index) => 
                        <FlightListing
                             games={flight} 
                             flightNum={index}
                             key={index} 
                    />)}
                </table>
            </div>
        )
    }
}

export default ShowBrackets