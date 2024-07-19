import { Component } from "react";


class Movie extends Component{
    state = {
        moive : "",
        cardData: ""
    }

    onchangeMoivename = (event) =>{
        this.setState({moive: event.target.value});
        
    }

    onsubmitfunction = async (event) => {
        event.preventDefault()
        const {moive} = this.state;

        const replaceText = moive.replace(/ /g, '+')  ;
        const apisearch = `https://openlibrary.org/search.json?title=${replaceText}`

        const response = await fetch(apisearch)
        const data = await response.json()
        if (response){
            this.setState({cardData:data})
        }
        
    }
    

    render(){
        return(
            <div>
                <div>
                    <form onSubmit={this.onsubmitfunction}>
                        <input type="text"
                        onChange={this.onchangeMoivename}
                         placeholder="Movie Name"/>
                         <button>click me</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Movie