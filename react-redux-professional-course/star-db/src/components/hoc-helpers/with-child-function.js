const withChildrenFunction = (fn) => (Wrapped) => (props) => {
    return (
        <Wrapped {...props}>
            {fn}
        </Wrapped>
    )
}

export default withChildrenFunction