function Error(props) {
    return (
      <div className='error'>
        <span>{props.errorMsg}</span>
      </div>
    )
}

export default Error;