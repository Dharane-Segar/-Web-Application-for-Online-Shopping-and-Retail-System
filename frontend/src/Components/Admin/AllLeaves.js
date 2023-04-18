import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import AdminDashBoard from "./AdminDashBoard";
import Footer from "../Common/Footer";

export default function AllLeave() {
  const [leaves, setLeaves] = useState([]);
  const [query, setQuery] = useState("");
  const [Id, setId] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    function get() {
      axios
        .get("http://localhost:8070/leave/getleaves")
        .then((res) => {
          console.log(res.data);
          setLeaves(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    get();
  }, []);

  function GET(id) {
    axios
      .get(`http://localhost:8070/leave/getId/${id}`)
      .then((res) => {
        setId(res.data.la._id);
        setStatus(res.data.la.status);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async function updateData(e) {
    e.preventDefault();

    const newStatus = { status };

    await axios
      .put(`http://localhost:8070/leave/update/${Id}`, newStatus)
      .then(() => {
        alert("Leave Application status updated");
        window.location.replace("/allleave");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <>
      <div>
        <AdminDashBoard></AdminDashBoard>
        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <br />
              <br />
              <br />
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <input
                      className="search-box1"
                      type="text"
                      placeholder="Type Leave Id here"
                      aria-label="Search for..."
                      aria-describedby="btnNavbarSearch"
                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div class="col-xl-3 col-md-6"></div>
                <div class="col-xl-3 col-md-6"></div>

                <div class="col-xl-3 col-md-6">
                  <a
                    className="btn btn-primary"
                    href="http://localhost:3000/reportle"
                    id="pdf"
                  >
                    Generate Report
                  </a>
                </div>
              </div>
            </div>

            <br />

            <br />

            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Leave Id</th>
                  <th scope="col">eid</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Title</th>
                  <th scope="col">Days</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Status</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              {leaves
                .filter((l) => l.Id.toString().includes(query))
                .map((l) => (
                  <tbody>
                    <tr>
                      <th scope="row">{l.Id}</th>
                      <td>{l.eid}</td>
                      <td>{l.fullname}</td>
                      <td>{l.title}</td>
                      <td>{l.days}</td>
                      <td>{l.startdate}</td>
                      <td>{l.enddate}</td>
                      <td>{l.reason}</td>
                      <td>{l.status}</td>
                      <td className="d-flex justify-content-between">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => GET(l.Id)}
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <CreateIcon />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:8070/leave/deletela/${l._id}`
                              )
                              .then((res) => {
                                if (res.data === "success") {
                                  alert(
                                    "Leave application deleted successfully"
                                  );
                                  window.location.replace("/allleave");
                                } else if (res.data === "error") {
                                  alert("Error in deleting leave application");
                                }
                              })
                              .catch((err) => {
                                alert(err);
                              });
                          }}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className=" font-weight-light my-4"
                style={{ alignContent: "center" }}
              >
                Update Status
              </h3>
              <button
                type="button"
                className="close-modal"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-floating mb-3">
                <label>Status :</label>
                <br />
                <br />
                <input className="form-control" value={status} type="text" />
              </div>
              <label>Status : &nbsp;</label>
              <input
                type="radio"
                id="a"
                name="status"
                value="Accepted"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              ></input>
              <label htmlFor="m"> &nbsp;&nbsp;Accepted &nbsp;</label>
              <input
                type="radio"
                id="d"
                name="status"
                value="Denied"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              ></input>
              <label htmlFor="f"> &nbsp;&nbsp;Denied</label>
              <br />
            </div>

            <div className="d-grid">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginLeft: "100px", marginRight: "100px" }}
                onClick={updateData}
              >
                Update
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
