import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions';


const Counter = ({ counter = 0, inc, dec, rnd }) => {
    return (
        <div style={{ margin: '100px 200px' }}>
            <h2 id="counter">{counter}</h2>
            <button
                onClick={dec}
                className="btn btn-primary btn-lg"
                id="dec">-</button>
            <button
                onClick={inc}
                className="btn btn-primary btn-lg"
                id="inc">+</button>
            <button
                onClick={rnd}
                className="btn btn-primary btn-lg"
                id="rnd">RND</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        counter: state
    }
}


// const mapDispatchToProps = (dispatch) => {
//     const { inc, dec, rnd } = bindActionCreators(actions, dispatch)

//     return {
//         inc,
//         dec,
//         rnd: () => {
//             const randVal = Math.floor(Math.random() * 10)
//             rnd(randVal)
//         },
//     }
// }

// //    ||
// //   \\//
// //    \/

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(actions, dispatch)
//  }

// //    ||
// //   \\//
// //    \/


// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// //    ||
// //   \\//
// //    \/
export default connect(mapStateToProps, actions)(Counter);