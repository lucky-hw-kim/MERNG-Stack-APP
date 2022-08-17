import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";


const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {name, email, phone},
    update(cache, {data: {addClient}}) {
      const {clients} = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {clients: [...clients, addClient]}
      })
    }
  });


  const onSubmit = (e) =>{
    e.preventDefault();
    console.log(name, email, phone);
    if(name === "" || email === "" || phone === ""){
      return alert("please fill in all required fields")
    }

    addClient(name, email, phone)

    setEmail("")
    setName("")
    setPhone("")
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div> Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add New Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <input
                    placeholder="Name"
                    type="text"
                    className="form-control"
                    id="name"
                    vale={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                                    <input
                    placeholder="Email"
                    type="text"
                    className="form-control"
                    id="email"
                    vale={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                                    <input
                    placeholder="Phone"
                    type="text"
                    className="form-control"
                    id="phone"
                    vale={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button className="btn btn-secondary" 
                data-bs-dismiss="modal"
                type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
