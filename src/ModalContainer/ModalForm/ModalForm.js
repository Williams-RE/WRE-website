import React from 'react';

export const ModalForm = ({ onSubmit, closeModal }) => {
  return (
    <form onSubmit={onSubmit}>


      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
     
     
     
     
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
        
      </div>

      <div className="form-group">
        <label htmlFor="agent">  Agent</label>
        <input className="form-control" id="agent" />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <input 
        type = 'comment'
        className="form-control" 
        id="comment"
        placeholder = "What can we do for you" />
      </div>

      
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit" 
          onClick={closeModal}>
          Submit
        </button>
      </div>



    </form>
  );
};
export default ModalForm;
