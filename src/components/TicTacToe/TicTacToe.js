import { connect } from 'react-redux'
import React from 'react'
import { XSvg, OSvg } from '@components'
import './TicTacToe.scss'

class TicTacToe extends React.Component {

    state = {
        pieceOne: null,
        pieceTwo: null,
        step: 0
    }

    updateStep = step => () => {
        switch (step) {
            case 'pick':
                this.setState({ step: 0 });
                break;
            case 'game':
                this.setState({ step: 1 });
                break;
            default:
                this.setState({ step: 0 });
                break;
        }
    }

    inputFileUpload = piece => fileEvent => {
        fileEvent.stopPropagation()

        let reader = new FileReader()
        let file = fileEvent.target.files[0]

        reader.addEventListener("load", () => {
            this.setState({ [piece]: reader.result })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    selectPiece = piece => () => {
        this.setState({ selected: piece })
    }

    renderPick() {
        const { pieceOne, pieceTwo, selected } = this.state
        const selectedClass = piece => selected === piece ? 'selected' : ''

        return (
            <div className="pick-pieces">
                <div className="pick-pieces__title">
                    Pick your piece!
                </div>
                <div className="pick-pieces__container">
                    <div className="pick-pieces__piece-one">
                        <div onClick={this.selectPiece('pieceOne')}>
                            {pieceOne && <img src={pieceOne} className={selectedClass('pieceOne')} />}
                            {!pieceOne && <XSvg className={selectedClass('pieceOne')} />}
                        </div>
                        <div className="pick-pieces__input-one">
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={this.inputFileUpload('pieceOne')} />
                            <div className="pick-pieces__label-one">
                                Upload Your Own
                            </div>
                        </div>
                    </div>
                    <div className="pick-pieces__piece-two">
                        <div onClick={this.selectPiece('pieceTwo')}>
                            {pieceTwo && <img src={pieceTwo} className={selectedClass('pieceTwo')} />}
                            {!pieceTwo && <OSvg className={selectedClass('pieceTwo')} />}
                        </div>
                        <div className="pick-pieces__input-two">
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={this.inputFileUpload('pieceTwo')} />
                            <div className="pick-pieces__label-two" >
                                Upload Your Own
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pick-pieces__play-container">
                    {selected && <div className="pick-pieces__play" onClick={this.updateStep('game')}>
                        Play
                    </div>}
                </div>
            </div>
        )
    }

    renderGame() {
        return (
            <div className="game">
                game
            </div>
        )
    }

    render() {
        const { breakpoint } = this.props
        const { step } = this.state

        return (
            <div className={`tic-tac-toe ${breakpoint}`}>
                <div className="tic-tac-toe__pick" style={{ transform: `translateX(${-100 * step}%)` }}>
                    {this.renderPick()}
                </div>
                <div className="tic-tac-toe__game" style={{ transform: `translateX(${-100 * step}%)` }}>
                    {this.renderGame()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.page })

const mapDispatchToProps = dispatch => (
    {
        updateWidth: pixels => dispatch(updateWidth(pixels))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)
