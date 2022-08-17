import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {name, description, status, clientId},

    // Update cache to rerender page
    update(cache, {data: {addProject}}) {
      const {projects} = cache.readQuery({
        query: GET_PROJECTS
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {projects: [...projects, addProject]}
      })
    }
  });

  // Get Clients for select
  const {loading, error, data} = useQuery(GET_CLIENTS)

  const onSubmit = (e) => {
    e.preventDefault();
 
    if (name === "" || description === "" ) {
      return alert("please fill in all required fields");
    }

    addProject(name, status, description, clientId)

    setDescription("");
    setName("");
    setStatus("new");
    setClientId("");
  };

  if(loading) return null
  if(error) return <p>Something Went Wrong</p>

  return (
    <>
    {!loading && !error && (
      <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
        >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div> Add Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
        >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                New Project
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
                <div className='mb-3'>
                  <label className="form-label">Name</label>
                  <input
                    placeholder="Name"
                    type="text"
                    className="form-control"
                    id="name"
                    vale={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                  <label className="form-label">Description</label>
                  <input
                    placeholder="Description"
                    type="text"
                    className="form-control"
                    id="Description"
                    vale={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>

                  <label className="form-label">Status</label>
                  <select
                    name=""
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Client
                      </label>
                      <select name="clientId" id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        { data.clients.map(client => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
                </div>
                <button
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  type="submit"
                  >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );
};

export default AddProjectModal;
