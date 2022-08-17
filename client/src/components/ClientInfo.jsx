import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa"



const ClientInfo = () => {
  return (
    <>
    <h5 className="mt-5">
      client Information
    </h5>
    <ul className="list-group">
      <li className="list-group-item">
        <FaIdBadge className="icon"/>
      </li>
    </ul>
    </>
  )
}

export default ClientInfo