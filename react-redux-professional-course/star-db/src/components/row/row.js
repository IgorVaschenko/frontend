const Row = ({ left, right }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6" style={{ margin: '15px 0' }}>
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
}

export default Row;