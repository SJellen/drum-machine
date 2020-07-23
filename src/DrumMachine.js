import React from 'react'
import { soundSet1, soundSet2 } from './soundSets'
import DrumPad from './DrumPad'


class DrumMachine extends React.Component {
    constructor(props) {
    super(props)

    this.state = {
        soundSet: soundSet1,
        displayText: "Sound"
        }
        this.changeSoundSet = this.changeSoundSet.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    changeSoundSet() {
        if (this.state.soundSet === soundSet1) {
            this.setState({
                soundSet: soundSet2
            })
        } else {
            this.setState({
                soundSet: soundSet1
            })
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
        document.addEventListener("keyup", this.handleKeyUp)
    }

    handleKeyDown(e) {
        let audio = document.querySelectorAll('audio')
        for (let i = 0; i < this.state.soundSet.length; i++) {
            if (
                e.keyCode === this.state.soundSet[i].keyCode ||
                e.keyCode === this.state.soundSet[i].keyTrigger.toLowerCase().charCodeAt()
            ) {
                let sound = audio[i]
                let drumPad = document.querySelectorAll('.drum-pad')
                sound.play()
                sound.currentTime = 0
                this.setState({ displayText: this.state.soundSet[i].id})
                drumPad[i].style.boxShadow = "unset"
            }
          }
        }

    handleKeyUp(e) {
        for (let i = 0; i < this.state.soundSet.length; i++) {
            if (
                e.keyCode === this.state.soundSet[i].keyCode ||
                e.keyCode === this.state.soundSet[i].keyTrigger.toLowerCase().charCodeAt()
            ) {
                let drumPad = document.querySelectorAll('.drum-pad')
                drumPad[i].style.boxShadow = "-2px -2px 1px black, 5px 5px 2px black"
            }   
        }
    }  

    render() {
        let drumpad = this.state.soundSet.map((x) => {
            return (
                <DrumPad
                    keyTrigger={x.keyTrigger}
                    id={x.id}
                    url={x.url}
                    ref={this.drumpadElement}
                    className="drum-pad"
                    key={x.id}
                 />
            )
        })

        return (
            <div>
                <div className="container">
        <h1>
          Pocket Drum Machine
        </h1>
        <div id="drum-machine">{drumpad}</div>
        <div className="other">
          <label className="label">
            <div className="toggle">
              <input
                className="toggle-state"
                type="checkbox"
                name="check"
                value="check"
                onClick={this.changeSoundSet}
              />
              <div className="indicator"></div>
            </div>
            <h3>Change Kit</h3>
          </label>
          <div id="display">{this.state.displayText}</div>
        </div>


            </div>
            </div>

          

            )



    }
    
    

}





export default DrumMachine