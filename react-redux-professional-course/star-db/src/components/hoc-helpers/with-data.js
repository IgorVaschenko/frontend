import { Component } from "react"
import ErrorBoundary from "../error-boundary"
import ErrorIndicator from "../error-indicator/error-indicator"
import Spinner from "../spinner"

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
      loading: false
    }

    componentDidMount() {
      this.updateItem()
    }

    componentDidUpdate(prevProps){
      if(this.props.getData !== prevProps.getData)  this.updateItem()
    }
    
    updateItem = () => {
      this.setState({ loading: true })

      const {getData} = this.props
      getData()
        .then((data) => {
          this.setState({ data, loading: false })
        })
        .catch(() => {
          this.setState({ error: true, loading: false })
        })
    }


    render() {

      const { data, error, loading } = this.state

      const spinner = loading ? <Spinner /> : null
      const errorCase = error ? <ErrorIndicator /> : null
      const content = data ? <View {...this.props} data={data} /> : null

      return (
        <ErrorBoundary>
          {spinner}
          {errorCase}
          {content}
        </ErrorBoundary>
      )
    }
  }
}


export default withData