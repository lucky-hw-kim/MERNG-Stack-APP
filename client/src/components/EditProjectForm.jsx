import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { EDIT_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries"


const EditProjectForm = ({projectId}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const {loading, error, data} = useQuery(GET_PROJECT, {
    variables: {id: projectId}
  })

  const [editProject] = useMutation(EDIT_PROJECT, {
    variables: {id: projectId, name, description, status},
    refetchQueries: [{query: GET_PROJECT, variables: {id: projectId}}]
  })


  const onSubmit = (e) => {
    e.preventDefault();

    if(!name || !description || !status) {
      return alert("Please fill out all the fields")
    }

    editProject(name, description, status)

    setName("");
    setDescription("");
    setStatus("");
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
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
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  >
                  Save
                </button>
      </form>
    </div>
  )
}

export default EditProjectForm