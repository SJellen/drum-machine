import React from 'react'



class DrumPad extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            play: false,
            displayText: ''
        }

        this.playSound = this.playSound.bind(this)
    }
    playSound(event) {
        this.setState({
            play: !this.state.play,
            displayText: [event]
        })

        this[event].play()
        this[event].currentTime = 0

        let check = document.querySelector('#display')
        check.innerHTML= [event]
    }

    render() {
        return (
            <div
                className={this.props.className}
                id={this.props.id}
                style={this.state.style}
                onClick={() => this.playSound(this.props.id)}
            >
            {this.props.keyTrigger}

            <audio
                ref={(ref) => (this[this.props.id] = ref)}
                src={this.props.url}
                className='clip'
                id={this.props.keyTrigger}
            ></audio>
            </div>
        )
    }
}




export default DrumPad