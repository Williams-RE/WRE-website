import React from 'react';

export const ModalForm = ({ onSubmit, closeModal }) => {
  return (
    <form action="http://localhost:3002/send-email" method="POST">


      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" name="name" id="name" />
     
     
     
     
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
        
      </div>

      <div className="form-group">
        <label htmlFor="agent">  Agent</label>
        <input className="form-control" name="agent" id="agent" />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <input 
        name="comment"
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
