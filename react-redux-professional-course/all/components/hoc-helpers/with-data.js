import React, { Component } from 'react'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner'

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: false,
      error: false,
    }

    componentDidMount() {
      this.update()
    }

    componentDidUpdate(prevProps) {
      prevProps.getData !== this.props.getData && this.update()
    }

    update() {
      this.setState({ loading: true })
      this.props.getData()
        .then((data) => {
          this.setState({ data, loading: false })
        })
        .catch(() => {
          this.setState({ error: true, loading: false })
        })
    }

    render() {

      const { data, loading, error } = this.state

      const loader = loading ? <Spinner /> : null
      const errorWindow = error ? <ErrorIndicator /> : null
      const content = data ? <View {...this.props} data={data} /> : null

      return (
        <>
          {loader}
          {errorWindow}
          {content}
        </>
      )
    }
  }
}


export default withData