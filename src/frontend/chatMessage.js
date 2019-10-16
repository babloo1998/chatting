import React from 'react'

export default ({ name, message }) =>
<div className="sent">
  <p className="sent-message">
    <strong>{name}</strong>: <em>{message}</em>
  </p>
</div>  